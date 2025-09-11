import {Book} from '../books/book.interface';

export type Author = {
  id: string;
  firstname: string;
  lastname: string;
}

export type AuthorWithBooks = {
  id: string;
  firstname: string;
  lastname: string;
  books: Book[];
}
