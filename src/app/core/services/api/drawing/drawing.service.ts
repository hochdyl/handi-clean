/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Drawing } from 'src/app/core/models/drawing';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DrawingService {

  private API_URL;
  private API_URI = 'drawings';
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

  get(childId: number): Observable<Drawing[]> {
    return this.http.get<Drawing[]>(this.API_URL + 'children/' + childId + '/' + this.API_URI);
  }

  getById(id: number): Observable<Drawing> {
    return this.http.get<Drawing>(this.API_URL + this.API_URI + '/' + id);
  }

  add(childId: number, drawing: any) {
    return new HttpRequest('POST',
      this.API_URL + 'children/' + childId + '/' + this.API_URI, drawing, this.options);
  }

  deleteById(id: number): Observable<Drawing> {
    return this.http.delete<Drawing>(this.API_URL + this.API_URI + '/' + id);
  }
}
