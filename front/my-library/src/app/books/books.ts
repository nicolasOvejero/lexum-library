import { Component, OnInit } from '@angular/core';
import { BooksService } from './books.service';
import { Book } from './book.interface';
import { first } from 'rxjs';
import {Author} from '../authors/author.interface';
import {Authors} from '../authors/authors';


@Component({
  selector: 'app-books',
  imports: [],
  providers: [
    BooksService,
  ],
  templateUrl: './books.html',
  styleUrl: './books.scss'
})
export class Books implements OnInit {
  books: Book[] = [];

  constructor(private booksService: BooksService) {}

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
}
