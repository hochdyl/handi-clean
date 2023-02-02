/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Statistic } from 'src/app/core/models/statistic';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private API_URL;
  private API_URI = 'statistics';

  constructor(private http: HttpClient) {
      this.API_URL=environment.API_URL;
   }

   get(childId: number): Observable<Statistic[]> {
    return this.http.get<Statistic[]>(this.API_URL + 'children/' + childId + '/' + this.API_URI);
  }

  getById(id: number): Observable<Statistic> {
    return this.http.get<Statistic>(this.API_URL + this.API_URI + '/' + id);
  }

  addStatistic(childId: number, gameId: number, statistic: Statistic): Observable<Statistic> {
    return this.http.post<Statistic>(this.API_URL + 'children/' + childId + '/games/' +  gameId + '/' + this.API_URI , statistic);
  }

}
