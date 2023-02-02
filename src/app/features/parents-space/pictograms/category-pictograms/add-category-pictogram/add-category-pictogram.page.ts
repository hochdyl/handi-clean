/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from 'src/app/core/components/alerts/alert/alert.component';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { NotificationsService } from 'src/app/core/services/alerts/notifications/notifications.service';
import { CategoryPictogramService } from 'src/app/core/services/api/category-pictogram/category-pictogram.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PhotoService } from 'src/app/core/services/photo.service';

@Component({
  selector: 'app-add-category-pictogram',
  templateUrl: './add-category-pictogram.page.html',
  styleUrls: ['./add-category-pictogram.page.scss'],
})
export class AddCategoryPictogramPage implements OnInit {

  ionicForm: FormGroup;
  photo;
  childId;
  userId;

  isFormSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationsService,
    private alert: AlertComponent,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private categoryPictogramService: CategoryPictogramService,
    private photoService: PhotoService,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    this.ionicForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    });

    this.childId = +this.route.snapshot.paramMap.get('childId');
    this.userId = +this.route.snapshot.paramMap.get('id');
  }

  async addPhoto() {
    this.photoService.takePicture().then(image => {
      this.photo = image.dataUrl;
    });
  }

  async addCategoryPictogram() {
    // this.loadingService.simpleLoader('Ajout en cours...');

    // this.photo = this.photoService.getPhoto();
    // const convertBase64ToBlob = async (base64) => {
    //   const response = await fetch(base64);
    //   const blob = await response.blob();
    //   return blob;
    // };
    //const blob2 =  await convertBase64ToBlob(this.photo);

    // const base64 = await fetch(this.photo);
    // const blob = await base64.blob();

    // const postData = new FormData();
    // postData.append('image_path', blob);
    // console.log('photo2', blob);

    // this.ionicForm.patchValue({
    //   image_path : this.file,
    // });

    // const postData2 = new FormData();
    // postData2.append('image_path', this.ionicForm.get('image_path').value);

    // console.log(this.ionicForm.value);

    // this.ionicForm.patchValue({
    //   image_path : postData2,
    // });
  }

  // onFileChange(fileChangeEvent) {
  //   this.file = fileChangeEvent.target.files[0];
  // }

  async submitForm() {
    this.loadingService.simpleLoader('Ajout en cours...');
    const name = this.ionicForm.get('name').value;
    if(!this.photo) {
       setTimeout(() => this.loadingService.dismissLoader(), 500);
      this.alert.presentAlert('Une erreur est survenue',"L'image est oubliée" , ['Réessayer']);
      this.photoService.photo = [];
    }
    else {
      const base64 = await fetch(this.photo);
      const blob = await base64.blob();

      const formData = new FormData();
      formData.append('image_path', blob);
      formData.append('name', name);
      //  console.log(this.file);
      // console.log('form', formData.getAll('files'));
      // const test: CategoryPictogram = {
      //   name: 'test',
      //   image_path: formData,
      // };
      // const httpOptions = {
      //   headers: new HttpHeaders({enctype: 'multipart/form-data; boundary=WebAppBoundary',
      //   'Content-Type': 'multipart/form-data; boundary=WebAppBoundary', })
      // };
      // const httpOptions = {
      //   headers: new HttpHeaders({
      //   'Content-Type': 'multipart/form-data; boundary=WebAppBoundary', Accept: 'application/json' })
      // };
      //   console.log(formData.get('image_path'));
      //   console.log('test',test);
      //   fetch('http://127.0.0.1:8000/api/children/5/category-pictograms', {method: 'POST', body: formData, headers:  new Headers({
      //     Authorization: 'Bearer 11|lncUyunjEuJ5qqutIBq8nKRiJuEw5fyaKjSRQDi0',
      //     'Content-Type': 'multipart/form-data',
      // })});
      // this.http.post('http://127.0.0.1:8000/api/children/5/category-pictograms', formData, httpOptions).subscribe((response) => {
      //   console.log(response);
      // });

      //  const token = await this.authService.getCurrentToken();
      // const options = {
      //   headers: new HttpHeaders ({ Authorization: token }),
      //   params: new HttpParams(),
      //   reporrProgress:false,
      // };
      // const req =  new HttpRequest('POST',
      //'http://127.0.0.1:8000/api/children/'+ this.childId + '/category-pictograms', formData, options );


      this.http.request(this.categoryPictogramService.add(this.childId, formData)).subscribe(
        async (res) => {
          if (res) {
            setTimeout(() => this.loadingService.dismissLoader(), 500);
            this.router.navigate(['parents-space/' + this.userId + '/child/' + this.childId + '/category-pictograms']);
            this.notificationService.notificationToast('Catégorie ajoutée !', 'success');
            this.photoService.photo = [];
          } else {
            console.log('error');
             setTimeout(() => this.loadingService.dismissLoader(), 500);
            this.alert.presentAlert('Une erreur est survenue', res, ['Réessayer']);
          }
        },
        async (err) => {
          console.log(err);
           setTimeout(() => this.loadingService.dismissLoader(), 500);
          this.alert.presentAlert('Une erreur est survenue', err.error.message, ['Réessayer']);
        });
      }
  }
}
