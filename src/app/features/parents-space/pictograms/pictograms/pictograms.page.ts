/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonContent } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { AlertComponent } from 'src/app/core/components/alerts/alert/alert.component';
import { Child } from 'src/app/core/models/child';
import { Pictogram } from 'src/app/core/models/pictogram';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { NotificationsService } from 'src/app/core/services/alerts/notifications/notifications.service';
import { AuthUserService } from 'src/app/core/services/api/auth/auth-user.service';
import { ChildService } from 'src/app/core/services/api/child/child.service';
import { PictogramService } from 'src/app/core/services/api/pictogram/pictogram.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pictograms',
  templateUrl: './pictograms.page.html',
  styleUrls: ['./pictograms.page.scss'],
})
export class PictogramsPage {

  childId;
  userId;
  categoryPictogramId;
  child: Child;
  pictograms: Pictogram[] = [];
  filterTerm: string;
  API_URL;

  @ViewChild(IonContent) content: IonContent;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private pictogramService: PictogramService,
    private route: ActivatedRoute,
    private notificationService: NotificationsService,
    private alert: AlertComponent,
    private childService: ChildService,
    private authApiService: AuthUserService,
    private authService: AuthService,
    private alertController: AlertController,
    private zone: NgZone,
  ) {
      this.API_URL = environment.API_URL;
      // Supprimer le api/ à la fin
      this.API_URL = this.API_URL.substring(0, this.API_URL.length - 4);
   }

  async ionViewWillEnter() {
    this.childId = +this.route.snapshot.paramMap.get('childId');
    this.categoryPictogramId = +this.route.snapshot.paramMap.get('categoryPictogramId');
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.loadingService.simpleLoader('Veuillez patienter...');

    this.pictogramService.get(this.childId, this.categoryPictogramId)
      .pipe(
        tap((pictograms) => {
          this.pictograms = pictograms;
          console.log(pictograms);
          this.pictograms.forEach(pictogram => {
            if (!pictogram.image.image_path.includes('/assets')) {
              pictogram.image.image_path=this.API_URL + pictogram.image.image_path;
            }
          });
          this.childService.getById(this.childId)
            .pipe(
              tap((child) => {
                this.child = child;
              })
            )
            .subscribe(() => {
              setTimeout(() => console.log(''), 500);
            });
        })
      )
      .subscribe(() => {
        setTimeout(() => this.loadingService.dismissLoader(), 1000);
      });
  }

  showConfirm(pictogram: Pictogram) {
    this.alertController.create({
      header: 'Confirmation',
      subHeader: 'Confirmer votre action',
      message: 'Etes-vous sûre de vouloir supprimer le pictogramme ' + pictogram.name + ' ?',
      buttons: [
        {
          text: 'Annuler',
        },
        {
          text: 'Oui',
          handler: () => {
            this.loadingService.simpleLoader('Veuillez patienter...');
            this.pictogramService.deleteById(pictogram.id)
              .subscribe({
                next: () => {
                  this.update(pictogram.id);
                  this.notificationService.notificationToast('Pictogramme supprimé', 'danger');
                  this.zone.run(() => {
                    this.router.navigate([
                    'parents-space/' + this.userId + '/child/' +
                    this.childId + '/category-pictograms/' + this.categoryPictogramId + '/pictograms'
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
    });
  }

  update(id: number) {
    const category = this.pictograms.find(item => item.id === id);
    this.pictograms.splice(this.pictograms.indexOf(category), 1);
    setTimeout(() => this.loadingService.dismissLoader(), 500);
  }

  scrollToTop(){
    this.content.scrollToTop(1500);
  }

  refresh(event){
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }

}
