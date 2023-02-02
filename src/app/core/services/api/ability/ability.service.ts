/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ability } from 'src/app/core/models/ability';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbilityService {

  private API_URL;
  private API_URI = 'abilities';

  constructor(private http: HttpClient) {
      this.API_URL=environment.API_URL;
   }

  addAbility(id: number, ability: Ability): Observable<Ability> {
    return this.http.post<Ability>(this.API_URL +'children/' + id + '/' + this.API_URI, ability);
  }

  updateAbility(id: number, ability: Ability): Observable<Ability> {
    return this.http.put<Ability>(this.API_URL + this.API_URI + '/' + id, ability);
  }
}
