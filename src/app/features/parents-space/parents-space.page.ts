import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, PickerController, PickerOptions } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { tap } from 'rxjs/operators';
import { AlertComponent } from 'src/app/core/components/alerts/alert/alert.component';
import { Child } from 'src/app/core/models/child';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { NotificationsService } from 'src/app/core/services/alerts/notifications/notifications.service';
import { AuthUserService } from 'src/app/core/services/api/auth/auth-user.service';
import { ChildService } from 'src/app/core/services/api/child/child.service';
import { ChildGameService } from 'src/app/core/services/api/child-game/child-game.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-parents-space',
  templateUrl: './parents-space.page.html',
  styleUrls: ['./parents-space.page.scss'],
})
export class ParentsSpacePage {

  children: Child[] = [];
  userId;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private childGameService: ChildGameService,
    private route: ActivatedRoute,
    private storage: Storage,
    private notificationService: NotificationsService,
    private alert: AlertComponent,
    private childService: ChildService,
    private authApiService: AuthUserService,
    private authService: AuthService,
    private alertController: AlertController,
    private pickerController: PickerController,
    private zone: NgZone,
  ) {
    this.storage.create();
    this.storage.set('PARENT_MODE', true);
  }

  async ionViewWillEnter() {
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
  }

  async openPicker(url: string) {
    if (this.children.length === 1) {
      if (url === 'delete-child') {
        this.deleteChild(this.children[0].firstname, this.children[0].id);
      }
      else {
        this.zone.run(() => {
          this.router.navigate([
            'parents-space/' + this.userId + '/child/' + this.children[0].id + url
          ]);
        });
      }
    }
    else if (this.children.length < 1) {
      this.router.navigate(['/child-registration']);
    }
    else {
      const options: PickerOptions = {
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Ok',
            handler: (value: any) => {
              if (url === 'delete-child') {
                this.deleteChild(value.children.text, value.children.value);
              }
              else {
                this.zone.run(() => {
                  this.router.navigate([
                    'parents-space/' + this.userId + '/child/' + value.children.value + url
                  ]);
                });
              }
            }
          }
        ],
        columns: [{
          name: 'children',
          options: this.getColumnOptions()
        }]
      };

      const picker = await this.pickerController.create(options);
      picker.present();
    }
  }

  update(id: number) {
    const child = this.children.find(item => item.id === id);
    this.children.splice(this.children.indexOf(child), 1);
    setTimeout(() => this.loadingService.dismissLoader(), 500);
  }

  getColumnOptions() {
    const options = [];
    this.children.forEach(child => {
      options.push({ text: child.firstname, value: child.id });
    });
    return options;
  }

  deleteChild(firstname, childId) {
    this.alertController.create({
      header: 'Confirmation',
      subHeader: 'Confirmer votre action',
      message: 'Etes-vous sûre de vouloir supprimer ' + firstname + '?',
      buttons: [
        {
          text: 'Annuler',
        },
        {
          text: 'Oui',
          handler: () => {
            this.loadingService.simpleLoader('Veuillez patienter...');
            this.childService.deleteById(childId)
              .subscribe({
                next: () => {
                  this.update(childId);
                  this.notificationService.notificationToast('Enfant supprimé', 'danger');
                  this.zone.run(() => {
                    this.router.navigate([
                      'parents-space/' + this.userId
                    ]);
                  });
                },
                error: error => {
                  console.error('There was an error!', error);
                  setTimeout(() => this.loadingService.dismissLoader(), 500);
                  this.alert.presentAlert('Une erreur est survenue', error, ['Réessayer']);
                }
              });
          }
        }
      ]
    }).then(res => {
      res.present();
      this.zone.run(() => {
        this.router.navigate([
          'parents-space/' + this.userId
        ]);
      });
    });
  }

  deleteUser() {
    console.log('toto');
    this.alertController.create({
      header: 'Confirmation',
      subHeader: 'Etes-vous sûre de vouloir supprimer votre compte ?',
      message: 'Toutes les données seront perdues',
      buttons: [
        {
          text: 'Annuler',
        },
        {
          text: 'Oui',
          handler: () => {
            this.loadingService.simpleLoader('Veuillez patienter...');
            this.authApiService.deleteProfile(this.userId)
              .subscribe({
                next: () => {
                  this.notificationService.notificationToast('Compte supprimé', 'danger');
                  this.authService.logout();
                  this.loadingService.dismissLoader();
                },
                error: error => {
                  console.error('There was an error!', error);
                  setTimeout(() => this.loadingService.dismissLoader(), 500);
                  this.alert.presentAlert('Une erreur est survenue', error, ['Réessayer']);
                }
              });
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  logout() {
    this.loadingService.simpleLoader('Déconnexion en cours...');
    this.authApiService.logout().subscribe(
      async (res) => {
        this.authService.logout();
        this.loadingService.dismissLoader();
        this.router.navigateByUrl('/connexion', { replaceUrl: true });
        this.notificationService.notificationToast('Déconnexion réussie !', 'success');
      },
      async (err) => {
        console.log(err);
        this.loadingService.dismissLoader();
        this.alert.presentAlert('Une erreur est survenue', err.error.message, ['Ok']);
        this.authService.logout();
        this.router.navigateByUrl('/connexion', { replaceUrl: true });
      });
  }

}
