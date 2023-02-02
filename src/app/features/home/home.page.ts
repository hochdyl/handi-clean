import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { AlertController, GestureController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { tap } from 'rxjs/operators';
import { Child } from 'src/app/core/models/child';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { NotificationsService } from 'src/app/core/services/alerts/notifications/notifications.service';
import { AuthUserService } from 'src/app/core/services/api/auth/auth-user.service';
import { ChildService } from 'src/app/core/services/api/child/child.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AlertComponent } from '../../core/components/alerts/alert/alert.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  children: Child[] = [];
  userId;

  constructor(
    private storage: Storage,
    private router: Router,
    private notificationService: NotificationsService,
    private alert: AlertComponent,
    private childService: ChildService,
    private authApiService: AuthUserService,
    private loadingService: LoadingService,
    private authService: AuthService,
    private alertController: AlertController,
    private screenOrientation: ScreenOrientation,
    private zone: NgZone,
  ) {
   }

  async accessSpaceParents() {
    const userId = await this.authService.getCurrentUserId();
    this.alertController.create({
      header: 'Accès espace parent',
      subHeader: 'Entrez votre mot de passe',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Entrez votre mot de passe',
          id: 'password'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
        },
        {
          text: 'Valider',
          handler: (data: any) => {
            this.loadingService.simpleLoader('Vérification en cours...');
            this.authApiService.getPassword(userId, data).subscribe(
              async (res) => {
                if (res.message === 'OK') {
                  console.log(res);
                  this.loadingService.dismissLoader();
                  this.zone.run(() => {
                    this.router.navigate(['/parents-space/' + userId ]);
                  });
                  //this.router.navigate(['/parents-space/' + userId ]);
                  // eslint-disable-next-line @typescript-eslint/quotes
                  this.notificationService.notificationToast("Vous êtes dans l'espace parent !", 'success');
                } else {
                  console.log('error');
                  this.loadingService.dismissLoader();
                  this.alert.presentAlert('Une erreur est survenue', res.message, ['Réessayer']);
                }
              },
              async (err) => {
                console.log(err);
                this.loadingService.dismissLoader();
                this.alert.presentAlert('Une erreur est survenue', err.error.message, ['Réessayer']);
              });
          }
        }
      ]
    }).then(res => {
      res.present();

      let timer;
      const passwordInput = document.getElementById('password');
      const runTimer = (timeout = 3000) => {
        timer = window.setTimeout(() => {
          res.dismiss();
        }, timeout);
      };
      runTimer();
      passwordInput.addEventListener('keypress', () => {
        clearTimeout(timer);
        runTimer(6000);
      });
    });
  }

  async ionViewWillEnter(){
    this.userId = await this.authService.getCurrentUserId();
    this.loadingService.simpleLoader('Veuillez patienter...');
    this.childService.get()
      .pipe(
        tap((children) => {
          this.children = children;
        })
      )
      .subscribe(() => {
        setTimeout(() => this.loadingService.dismissLoader(), 500);
      });

    this.storage.remove('CHILD');
    this.storage.remove('PARENT_MODE');
    this.screenOrientation.unlock();
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
}


