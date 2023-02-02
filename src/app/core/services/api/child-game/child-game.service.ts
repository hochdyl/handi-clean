/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/core/models/game';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChildGameService {

  private API_URL;
  private API_URI = '/child-games';

  constructor(private http: HttpClient) {
      this.API_URL=environment.API_URL;
   }

   get(id: number): Observable<Game[]> {
    return this.http.get<Game[]>(this.API_URL + 'children/' + id + this.API_URI);
  }
}
