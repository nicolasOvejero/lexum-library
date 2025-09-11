import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Author} from '../author.interface';
import {environment} from '../../../environment';

@Injectable()
export class AuthorsService {
  private apiUrl = `${environment.apiUrl}/authors`;

  constructor(private http: HttpClient) {}

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl);
  }
}
