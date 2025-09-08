import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book.interface';
import {Injectable} from '@angular/core';

@Injectable()
export class BooksService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books`);
  }
}
