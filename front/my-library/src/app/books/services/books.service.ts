import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../book.interface';
import {Injectable} from '@angular/core';
import {Author} from '../../authors/author.interface';
import {environment} from '../../../environment';

@Injectable()
export class BooksService {
  private apiUrl = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBook(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${bookId}`);
  }

  deleteBook(bookId: string): Observable<Book> {
    return this.http.delete<Book>(`${this.apiUrl}/${bookId}`);
  }

  saveBook(newBook: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(
      `${this.apiUrl}`,
      {
        ...newBook,
        authors: newBook.authors?.map((a: Author) => this.mapAuthors(a)),
      }
    );
  }

  updateBook(book: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(
      `${this.apiUrl}/${book.id}`,
      {
        ...book,
        authors: book.authors?.map((a: Author) => this.mapAuthors(a)),
      }
    );
  }

  private mapAuthors(author: Author): Partial<Author> {
    if (!author.id.startsWith('new-id-')) {
      return author;
    }
    return {
      firstname: author.firstname,
      lastname: author.lastname,
    }
  }
}
