/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from 'src/app/core/models/character';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterChildService {

  private API_URL;
  private API_URI = 'characters-child';

  constructor(private http: HttpClient) {
      this.API_URL=environment.API_URL;
   }

   get(childId: number): Observable<Character[]> {
    return this.http.get<Character[]>(this.API_URL + 'children/' + childId + '/' + this.API_URI);
  }

  addCharacter(idChild: number, gameId: number): Observable<any> {
    return this.http.post(this.API_URL + 'children/' + idChild + '/games/' +  gameId + '/' + this.API_URI, '');
  }
}
