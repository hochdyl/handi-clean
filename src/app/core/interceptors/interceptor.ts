/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  token: string;

  constructor(
    private authService: AuthService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // let promise = this.storage.get('AUTH_TOKEN');
    const promise = this.authService.getCurrentToken();

    return from(promise).pipe(mergeMap(token => {
      if (token || token != null || token !== undefined) {
        if(req.url.includes('category-pictograms') || req.url.includes('/pictograms')|| req.url.includes('/drawing')){
          const clonedReq = req.clone({
            setHeaders: {
              Authorization: 'Bearer ' + token,
            }
          });
         // console.log(clonedReq);

          return next.handle(clonedReq);
        }else{
          const clonedReq = req.clone({
            setHeaders: {
              'Content-type': 'application/json; charset=UTF-8',
              Authorization: 'Bearer ' + token,
            }
          });
          return next.handle(clonedReq);
        }
      } else {
        return next.handle(req);
      }
    }));
  }
}
