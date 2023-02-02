import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { filter, map, take } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class HomeGuardService {

  constructor(
    private storage: Storage,
    private authService: AuthService,
    private router: Router
  ) { }

  async canLoad(): Promise<boolean> {
    const userId = await this.authService.getCurrentUserId();
    let firtsVisit = '';
    this.storage.get('FIRST_VISIT').then(
      data => {
        firtsVisit = data;
        if (firtsVisit !== null) {
          this.storage.set('FIRST_VISIT', true);
          this.storage.get('CHILD').then(
            child => {
              child = child;
              if (!isNaN(child) && child !==undefined && child!== null) {
                this.router.navigateByUrl('/children-space/' + child, { replaceUrl: true });
              } else {
                this.storage.get('PARENT_MODE').then(
                  parentMode => {
                    parentMode = parentMode;
                    if (!isNaN(parentMode) && parentMode !==undefined && parentMode!== null) {
                      this.router.navigateByUrl('/parents-space/' + userId, { replaceUrl: true });
                    } else {
                      this.router.navigateByUrl('/home', { replaceUrl: true });
                    }
                  });
                this.router.navigateByUrl('/home', { replaceUrl: true });
              }
            });
          return true;
        } else {
          this.router.navigateByUrl('/tab1', { replaceUrl: true });
          return false;
        }
      });

    return true;
  }
}
