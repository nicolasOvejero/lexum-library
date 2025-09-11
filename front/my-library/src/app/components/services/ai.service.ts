import {Injectable} from '@angular/core';
import {environment} from '../../../environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AiService {
  private apiUrl = `${environment.apiUrl}/ai/book/summary`;

  constructor(private http: HttpClient) {}

  getBookDescription(title: string): Observable<string> {
    return this.http.post<string>(
      this.apiUrl,
      {
        title,
      }
    );
  }
}
