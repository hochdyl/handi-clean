/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryPictogram } from 'src/app/core/models/categoryPictogram';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryPictogramService {

  private API_URL;
  private API_URI = 'category-pictograms';
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

  get(childId: number): Observable<CategoryPictogram[]> {
    return this.http.get<CategoryPictogram[]>(this.API_URL + 'children/' + childId + '/' + this.API_URI);
  }

  getById(id: number): Observable<CategoryPictogram> {
    return this.http.get<CategoryPictogram>(this.API_URL + this.API_URI + '/' + id);
  }

  addCategoryPictogram(childId: number, categoryPictogram: CategoryPictogram): Observable<any> {
    return this.http.post<any>(
      this.API_URL + 'children/' + childId + '/' + this.API_URI, categoryPictogram);
  }

  add(childId: number, categoryPictogram: any) {
    return new HttpRequest('POST',
      this.API_URL + 'children/' + childId + '/' + this.API_URI + '/', categoryPictogram, this.options);
  }

  updateCategoryPictogram(id: number, categoryPictogram: CategoryPictogram): Observable<CategoryPictogram> {
    return this.http.put<CategoryPictogram>(this.API_URL + this.API_URI + '/' + id, categoryPictogram);
  }

  deleteById(id: number): Observable<CategoryPictogram> {
    return this.http.delete<CategoryPictogram>(this.API_URL + this.API_URI + '/' + id);
  }
}
