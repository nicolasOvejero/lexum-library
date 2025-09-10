import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Author} from '../author.interface';

@Injectable()
export class AuthorsService {
  private apiUrl = 'http://localhost:8080/api/authors';

  constructor(private http: HttpClient) {}

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl);
  }
}
