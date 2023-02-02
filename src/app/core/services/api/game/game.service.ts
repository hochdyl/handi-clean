/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/core/models/game';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private API_URL;
  private API_URI = 'games/';

  constructor(private http: HttpClient) {
      this.API_URL=environment.API_URL;
   }

   getById(id: number): Observable<Game> {
    return this.http.get<Game>(this.API_URL + this.API_URI + id);
  }
}
