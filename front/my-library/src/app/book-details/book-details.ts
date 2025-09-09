import {Component, inject, OnInit} from '@angular/core';
import {BooksService} from '../books/services/books.service';
import {Book} from '../books/book.interface';
import {first, switchMap} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Author} from '../authors/author.interface';
import {DatePipe, Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-details',
  imports: [
    DatePipe
  ],
  providers: [
    BooksService,
  ],
  templateUrl: './book-details.html',
  styleUrl: './book-details.scss'
})
export class BookDetails implements OnInit {
  book: Book | null = null;

  private _snackBar = inject(MatSnackBar);

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
      .subscribe((book: Book) => {
        this.book = book;
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
      ).subscribe(
        () => {
          console.log('Livre supprimé')
          this._snackBar.open('Book removed', undefined, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.location.back();
        }
    );
  }
}
