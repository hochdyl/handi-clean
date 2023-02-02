/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/core/models/role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private API_URL;
  private API_URI = 'roles';

  constructor(private http: HttpClient) {
      this.API_URL=environment.API_URL;
   }

   get(): Observable<Role[]> {
    return this.http.get<Role[]>(this.API_URL + this.API_URI);
  }
}
