import {Component, inject, OnInit} from '@angular/core';
import {BooksService} from '../books/services/books.service';
import {Book} from '../books/book.interface';
import {first, switchMap} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Author} from '../authors/author.interface';
import {DatePipe, Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {Popup} from '../components/popup/popup';
import {MatDialog} from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import {Error404} from '../components/error-404/error-404';

@Component({
  selector: 'app-book-details',
  imports: [
    DatePipe,
    MatButtonModule,
    Error404,
  ],
  providers: [
    BooksService,
  ],
  templateUrl: './book-details.html',
  styleUrl: './book-details.scss'
})
export class BookDetails implements OnInit {
  book: Book | null = null;

  showErrorPage: boolean = false;

  private _snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);

  constructor(
    private readonly booksService: BooksService,
    private readonly route: ActivatedRoute,
    private readonly location: Location,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params =>
          this.booksService.getBook(params.get('id')!)
        ),
        first(),
      )
      .subscribe({
        next: (book: Book) => {
          this.book = book;
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.showErrorPage = true;
            return;
          }

          this._snackBar.open('Impossible to retrieve book details', undefined, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          console.log(error)
        },
      });
  }

  mapAuthors(authors: Author[] | undefined): String {
    if (!authors) {
      return '';
    }

    return authors
      .map((author: Author) => `${author.firstname} ${author.lastname}`)
      .join(', ');
  }

  deleteBook(): void {
    const isValid = confirm('Are you sure ?');

    if (!isValid || !this.book) {
      return;
    }

    this.booksService
      .deleteBook(this.book.id)
      .pipe(
        first(),
      )
      .subscribe({
        next: () => {
          this._snackBar.open('Book removed', undefined, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.location.back();
        },
        error: (error) => {
          this._snackBar.open('Impossible to remove the book', undefined, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          console.log(error)
        },
      });
  }

  updateBook(): void {
    const dialogRef = this.dialog.open(Popup, {
      width: '70vw',
      maxWidth: '70vw',
      panelClass: 'full-screen-dialog',
      data: this.book,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.booksService
          .updateBook({
            id: this.book?.id,
            ...result,
          })
          .pipe(
            first(),
          )
          .subscribe({
            next: (book: Book) => {
              this.book = book;
              this._snackBar.open('Book updated', undefined, {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              });
            },
            error: (error) => {
              this._snackBar.open('Impossible to update the book', undefined, {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              });
              console.log(error)
            },
          });
      }
    });
  }
}
