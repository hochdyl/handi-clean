import { Injectable, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { AuthUserService } from '../api/auth/auth-user.service';
import { AlertComponent } from '../../components/alerts/alert/alert.component';
import { LoadingService } from '../alerts/loading/loading.service';
//import { Events } from '../core/events';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements OnInit {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';

  constructor(
    private storage: Storage,
    private router: Router,
    private authApi: AuthUserService,
    private alert: AlertComponent,
    private loadingService: LoadingService,
    private zone: NgZone,
    //private events: Events
  ) {
    this.loadToken();
    this.checkToken();
  }

  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  async ngOnInit() {
    await this.storage.create();
  }

  async getCurrentToken() {
    let token: string;
    await this.storage.get('AUTH_TOKEN').then(data => token = data?.token);
    return token;
  }

  async getCurrentUserId() {
    let userId: number;
    await this.storage.get('AUTH_TOKEN').then(data => userId = data?.id);
    return userId;
  }

  async checkToken() {
    const token = await this.getCurrentToken();
    const userId = await this.getCurrentUserId();

    if (token !== undefined) {
      await this.authApi.getProfile(userId).subscribe(
        async (res) => {
          this.isAuthenticated.next(true);
        },
        async (err) => {
          // console.log(err);
          this.loadingService.dismissLoader();
          await this.alert.presentAlert('Token expiré', null, ['Ok'], true);
          this.logout();
        }
      );
    }
    else {
      return;
    }
  }

  async loadToken() {
    const token = await this.storage.get('AUTH_TOKEN');
    if (token) {
      // console.log('set token: ', token);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(data) {
    if (data.access_token) {
      this.storage.set('AUTH_TOKEN', { token: data.access_token, id: data.id });
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    //this.events.publish('user:connected', false);
    this.zone.run(() => {
      this.router.navigateByUrl('/tab4', { replaceUrl: true });
    });
    return this.storage.remove('AUTH_TOKEN');

  }
}
