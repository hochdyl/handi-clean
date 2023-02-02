/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AlertComponent } from 'src/app/core/components/alerts/alert/alert.component';
import { CategoryGame } from 'src/app/core/models/categoryGame';
import { CategoryPictogram } from 'src/app/core/models/categoryPictogram';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { NotificationsService } from 'src/app/core/services/alerts/notifications/notifications.service';
import { CategoryPictogramService } from 'src/app/core/services/api/category-pictogram/category-pictogram.service';
import { PictogramService } from 'src/app/core/services/api/pictogram/pictogram.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PhotoService } from 'src/app/core/services/photo.service';

@Component({
  selector: 'app-add-pictogram',
  templateUrl: './add-pictogram.page.html',
  styleUrls: ['./add-pictogram.page.scss'],
})
export class AddPictogramPage implements OnInit {

  ionicForm: FormGroup;
  childId;
  userId;
  photo;
  categoryPictogramId;
  categoryActive;
  categoryPictograms: CategoryPictogram[] = [];

  isFormSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationsService,
    private alert: AlertComponent,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private pictogramService: PictogramService,
    private categoryPictogramService: CategoryPictogramService,
    private http: HttpClient,
    private photoService: PhotoService,
  ) {
  }

  ngOnInit() {
    this.childId = +this.route.snapshot.paramMap.get('childId');
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.categoryPictogramId = +this.route.snapshot.paramMap.get('categoryPictogramId');

    this.ionicForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      category_pictogram_id: [this.categoryPictogramId, [Validators.required]],
    });

    this.categoryPictogramService.get(this.childId)
      .pipe(
        tap((categoryPictograms) => {
          this.categoryPictograms = categoryPictograms;
          this.categoryPictograms.forEach(categoryPictogram => {
            if (categoryPictogram.id === this.categoryPictogramId) {
              this.categoryActive = categoryPictogram.name;
            }
          });
        })
      )
      .subscribe(() => {
        setTimeout(() => this.loadingService.dismissLoader(), 1000);
      });
  }

  async addPhoto() {
    this.photoService.takePicture().then(image => {
      this.photo = image.dataUrl;
    });
  }

  async submitForm() {
    this.loadingService.simpleLoader('Ajout en cours...');
    const name = this.ionicForm.get('name').value;
    const categoryPictogramId = this.ionicForm.get('category_pictogram_id').value;

    if (!this.photo) {
      setTimeout(() => this.loadingService.dismissLoader(), 500);
      this.alert.presentAlert('Une erreur est survenue', "L'image est oubliée", ['Réessayer']);
      this.photoService.photo = [];
    }
    else {
      const base64 = await fetch(this.photo);
      const blob = await base64.blob();

      const formData = new FormData();
      formData.append('image_path', blob);
      formData.append('name', name);
      formData.append('category_pictogram_id', categoryPictogramId);

      console.log(formData);
      this.http.request(this.pictogramService.add(this.childId, formData)).subscribe(
        async (res) => {
          if (res) {
            setTimeout(() => this.loadingService.dismissLoader(), 500);
            this.router.navigateByUrl(
              'parents-space/' + this.userId + '/child/' + this.childId + '/category-pictograms/' + this.categoryPictogramId + '/pictograms'
              , { replaceUrl: true });
            this.notificationService.notificationToast('Pictogramme ajoutée !', 'success');
            this.photoService.photo = [];
          } else {
            console.log('error');
            this.loadingService.dismissLoader();
            this.alert.presentAlert('Une erreur est survenue', res, ['Réessayer']);
          }
        },
        async (err) => {
          console.log(err);
          this.loadingService.dismissLoader();
          this.alert.presentAlert('Une erreur est survenue', err.error.message, ['Réessayer']);
        });
    }
  }

}
