/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pictogram } from 'src/app/core/models/pictogram';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PictogramService {

  private API_URL;
  private API_URI = 'pictograms';
  private token;
  private options;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {
      this.API_URL = environment.API_URL;
      this.getToken();
  }

  httpOptions = {
    headers: new HttpHeaders({
      enctype: 'multipart/form-data; boundary=WebAppBoundary',
      'Content-Type': 'multipart/form-data; boundary=WebAppBoundary',
    })
  };

  async getToken() {
    this.token = await this.authService.getCurrentToken();
    this.options = {
      headers: new HttpHeaders({ Authorization: this.token }),
      params: new HttpParams(),
      reporrProgress: false,
    };
  }

  get(childId: number, categoryPictogramId: number,): Observable<Pictogram[]> {
    return this.http.get<Pictogram[]>(
      this.API_URL + 'children/' + childId + '/category-pictograms/' + categoryPictogramId + '/' + this.API_URI
      );
  }

  getById(id: number): Observable<Pictogram> {
    return this.http.get<Pictogram>(this.API_URL + this.API_URI + '/' + id);
  }

  add(childId: number, pictogram: any) {
    return new HttpRequest('POST',
      this.API_URL + 'children/' + childId + '/' + this.API_URI
      , pictogram, this.options);
  }

  updatePictogram(id: number, pictogram: Pictogram): Observable<Pictogram> {
    return this.http.put<Pictogram>(this.API_URL + this.API_URI + '/' + id, pictogram);
  }

  deleteById(id: number): Observable<Pictogram> {
    return this.http.delete<Pictogram>(this.API_URL + this.API_URI + '/' + id);
  }

}
