/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonContent } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { AlertComponent } from 'src/app/core/components/alerts/alert/alert.component';
import { CategoryPictogram } from 'src/app/core/models/categoryPictogram';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { NotificationsService } from 'src/app/core/services/alerts/notifications/notifications.service';
import { AuthUserService } from 'src/app/core/services/api/auth/auth-user.service';
import { ChildService } from 'src/app/core/services/api/child/child.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CategoryPictogramService } from 'src/app/core/services/api/category-pictogram/category-pictogram.service';
import { Child } from 'src/app/core/models/child';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pictograms',
  templateUrl: './category-pictograms.page.html',
  styleUrls: ['./category-pictograms.page.scss'],
})
export class CategoryPictogramsPage {

  childId;
  userId;
  child: Child;
  categoryPictograms: CategoryPictogram[] = [];
  filterTerm: string;
  API_URL;

  @ViewChild(IonContent) content: IonContent;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private categoryPictogramService: CategoryPictogramService,
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
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.loadingService.simpleLoader('Veuillez patienter...');
    this.categoryPictogramService.get(this.childId)
      .pipe(
        tap((categoryPictograms) => {
          this.categoryPictograms = categoryPictograms;
          this.categoryPictograms.forEach(categoryPictogram => {
            if (!categoryPictogram.image.image_path.includes('/assets')) {
              categoryPictogram.image.image_path=this.API_URL + categoryPictogram.image.image_path;
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

  showConfirm(categoryPictogram: CategoryPictogram) {
    this.alertController.create({
      header: 'Confirmation',
      subHeader: 'Confirmer votre action',
      message: 'Etes-vous sûre de vouloir supprimer la catégorie ' + categoryPictogram.name + ' ?',
      buttons: [
        {
          text: 'Annuler',
        },
        {
          text: 'Oui',
          handler: () => {
            this.loadingService.simpleLoader('Veuillez patienter...');
            this.categoryPictogramService.deleteById(categoryPictogram.id)
              .subscribe({
                next: () => {
                  this.update(categoryPictogram.id);
                  this.notificationService.notificationToast('Catégorie supprimé', 'danger');
                  this.zone.run(() => {
                    this.router.navigate([
                    'parents-space/' + this.userId + '/child/' + this.childId + '/category-pictograms'
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
    const category = this.categoryPictograms.find(item => item.id === id);
    this.categoryPictograms.splice(this.categoryPictograms.indexOf(category), 1);
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
