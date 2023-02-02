/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer 2|c1RcyF67lbzFApOQxyCOMVumzyiV5qnuUD9VoeWl'
    }),
  };

  API_URL;

  constructor(private http: HttpClient) {
      this.API_URL=environment.API_URL;
   }

  get(): Observable<string[]> {
    return this.http.get<string[]>(this.API_URL +'children/3/child-games');
  }

  login(credentials: { email; password }): Observable<any> {
    return this.http.post(this.API_URL +'login', credentials);
  }

  user(token): Observable<string[]> {
    return this.http.get<string[]>(this.API_URL +'users/2');
  }
}
