import {Component, Input} from '@angular/core';
import {Author} from '../../authors/author.interface';
import {Book} from '../../books/book.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss'
})
export class BookCard {
  @Input({ required: true })
  book!: Book;

  constructor(
    private router: Router,
  ) {
  }

  mapAuthors(authors: Author[] | undefined): String {
    if (!authors) {
      return '';
    }

    return authors
      .map((author: Author) => `${author.firstname} ${author.lastname}`)
      .join(', ');
  }

  showBook(bookId: string): void {
    this.router.navigate([`/books/${bookId}`]);
  }
}
