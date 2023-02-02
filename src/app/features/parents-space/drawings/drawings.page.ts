/* eslint-disable @typescript-eslint/member-ordering */
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonContent } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { AlertComponent } from 'src/app/core/components/alerts/alert/alert.component';
import { Child } from 'src/app/core/models/child';
import { Drawing } from 'src/app/core/models/drawing';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { NotificationsService } from 'src/app/core/services/alerts/notifications/notifications.service';
import { AuthUserService } from 'src/app/core/services/api/auth/auth-user.service';
import { ChildService } from 'src/app/core/services/api/child/child.service';
import { DrawingService } from 'src/app/core/services/api/drawing/drawing.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-drawings',
  templateUrl: './drawings.page.html',
  styleUrls: ['./drawings.page.scss'],
})
export class DrawingsPage {

  childId;
  userId;
  categoryPictogramId;
  child: Child;
  drawings: Drawing[] = [];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  API_URL;

  @ViewChild(IonContent) content: IonContent;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private drawingService: DrawingService,
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

    this.drawingService.get(this.childId)
      .pipe(
        tap((drawings) => {
          this.drawings = drawings;
          console.log(drawings);
          this.drawings.forEach(drawing => {
            if (!drawing.image.image_path.includes('/assets')) {
              drawing.image.image_path=this.API_URL + drawing.image.image_path;
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

  showConfirm(drawing: Drawing) {
    this.alertController.create({
      header: 'Confirmation',
      subHeader: 'Confirmer votre action',
      message: 'Etes-vous sûre de vouloir supprimer le dessin ?',
      buttons: [
        {
          text: 'Annuler',
        },
        {
          text: 'Oui',
          handler: () => {
            this.loadingService.simpleLoader('Veuillez patienter...');
            this.drawingService.deleteById(drawing.id)
              .subscribe({
                next: () => {
                  this.update(drawing.id);
                  this.notificationService.notificationToast('Pictogramme supprimé', 'danger');
                  this.zone.run(() => {
                    this.router.navigate([
                    'parents-space/' + this.userId + '/child/' + this.childId + '/drawings/'
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
    const category = this.drawings.find(item => item.id === id);
    this.drawings.splice(this.drawings.indexOf(category), 1);
    setTimeout(() => this.loadingService.dismissLoader(), 500);
  }

  scrollToTop(){
    this.content.scrollToTop(1500);
  }

}
