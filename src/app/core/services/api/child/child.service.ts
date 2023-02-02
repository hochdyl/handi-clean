/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ability } from 'src/app/core/models/ability';
import { Child } from 'src/app/core/models/child';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  private API_URL;
  private API_URI = 'children';

  constructor(private http: HttpClient) {
      this.API_URL=environment.API_URL;
   }

   get(): Observable<Child[]> {
    return this.http.get<Child[]>(this.API_URL + this.API_URI);
  }

  getById(id: number): Observable<Child> {
    return this.http.get<Child>(this.API_URL + this.API_URI + '/' + id);
  }

  addChild(child: Child): Observable<Child> {
    return this.http.post<Child>(this.API_URL + this.API_URI, child);
  }

  updateChild(id: number, child: Child): Observable<Child> {
    return this.http.put<Child>(this.API_URL + this.API_URI + '/' + id, child);
  }

  updateChildCharacter(id: number, characterId: {character_id} ): Observable<Child> {
    return this.http.put<Child>(this.API_URL + this.API_URI + '/' + id + '/characters', characterId);
  }

  deleteById(id: number): Observable<Child> {
    return this.http.delete<Child>(this.API_URL + this.API_URI + '/' + id);
  }
}
