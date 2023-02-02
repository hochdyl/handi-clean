/* eslint-disable @typescript-eslint/naming-convention */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from 'src/app/core/models/user';
import { environment } from 'src/environments/environment';
import { AuthUser } from 'src/app/core/models/auth_user';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private API_URL;
  private API_URI = 'users';

  constructor(private http: HttpClient) {
      this.API_URL=environment.API_URL;
   }

   login(credentials: AuthUser): Observable<any> {
    return this.http.post(this.API_URL +'login', credentials);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.API_URL + 'register', user);
  }

  getProfile(userId: number): Observable<User> {
    return this.http.get<User>(this.API_URL + this.API_URI + '/' + userId);
  }

  getPassword(id: number, password: {password}): Observable<any>{
    return this.http.post(this.API_URL + this.API_URI + '/'+ id + '/password', password);
  }

  updateProfile(userId: number, user: User): Observable<User> {
    return this.http.put<User>(this.API_URL + this.API_URI + '/' + userId, user);
  }

  updatePassword(id: number, userPassword: {password; confirmPassword}): Observable<any>{
    return this.http.put(this.API_URL + this.API_URI + '/'+ id + '/password', userPassword);
  }

  deleteProfile(id: number): Observable<User>{
    return this.http.delete<User>(this.API_URL + this.API_URI + '/' + id);
  }

  logout(): Observable<User>{
    return this.http.get<User>(this.API_URL + 'logout');
  }
}
