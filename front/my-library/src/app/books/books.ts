import {Component, inject, OnInit} from '@angular/core';
import { BooksService } from './services/books.service';
import { Book } from './book.interface';
import { first } from 'rxjs';
import {Author} from '../authors/author.interface';
import {Popup} from '../components/popup/popup';
import {ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-books',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [
    BooksService,
  ],
  templateUrl: './books.html',
  styleUrl: './books.scss'
})
export class Books implements OnInit {
  books: Book[] = [];
  readonly dialog = inject(MatDialog);

  private _snackBar = inject(MatSnackBar);

  constructor(
    private booksService: BooksService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.booksService
      .getBooks()
      .pipe(
        first(),
      )
      .subscribe((books: Book[]) => {
        this.books = books;
      });
  }

  mapAuthors(authors: Author[]): String {
    return authors
      .map((author: Author) => `${author.firstname} ${author.lastname}`)
      .join(', ');
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(Popup, {
      width: '70vw',
      maxWidth: '70vw',
      panelClass: 'full-screen-dialog'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.saveBook(result);
      }
      console.log('The dialog was closed', result);
    });
  }

  showBook(bookId: string): void {
    this.router.navigate([`/books/${bookId}`]);
  }

  private saveBook(result: any): void {
    this.booksService
      .saveBook({
        ...result,
        authors: result.authors.split(',').map((v: string) => ({ firstname: v } as Author))
      })
      .pipe(
        first(),
      )
      .subscribe((book: Book) => {
        this.books.push(book);
        this._snackBar.open('Book added', undefined, {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      });
  }
}
