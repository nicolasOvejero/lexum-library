import {Component, inject, OnInit} from '@angular/core';
import { BooksService } from './services/books.service';
import { Book } from './book.interface';
import { first } from 'rxjs';
import {Popup} from '../components/popup/popup';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialog} from '@angular/material/dialog';
import {BookCard} from '../components/book-card/book-card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-books',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    BookCard,
    MatButton,
    MatIcon,
    MatIconButton,
  ],
  providers: [
    BooksService,
  ],
  templateUrl: './books.html',
  styleUrl: './books.scss'
})
export class Books implements OnInit {
  books: Book[] = [];
  filter: FormControl = new FormControl('');
  readonly dialog = inject(MatDialog);

  private _snackBar = inject(MatSnackBar);
  private initialBooks: Book[] = [];

  constructor(
    private booksService: BooksService,
  ) {
  }

  ngOnInit(): void {
    this.booksService
      .getBooks()
      .pipe(
        first(),
      )
      .subscribe({
        next: (books: Book[]) => {
          this.books = books;
          this.initialBooks = books;
        },
        error: (error) => {
          this._snackBar.open('Impossible to retrieve books', undefined, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          console.log(error)
        }
      });
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
    });
  }

  filterBook(): void {
    if (!this.filter || this.filter.value.trim() === '') {
      return;
    }

    const toSearch: string = this.filter.value;
    this.books = this.initialBooks
      .filter((book) =>
        book.title.includes(toSearch) ||
        book.authors.some(({ firstname, lastname }) => firstname.includes(toSearch) || lastname.includes(toSearch))
      );
  }

  clearFilter(): void {
    this.books = this.initialBooks;
    this.filter.reset();
  }

  private saveBook(result: any): void {
    this.booksService
      .saveBook(result)
      .pipe(
        first(),
      )
      .subscribe({
        next: (book: Book) => {
          this.books.push(book);
          this._snackBar.open('Book added', undefined, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
        error: (error) => {
          this._snackBar.open('Book not saved, an error happened', undefined, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          console.log(error)
        },
      });
  }
}
