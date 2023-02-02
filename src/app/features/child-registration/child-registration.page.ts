/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/core/components/alerts/alert/alert.component';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { NotificationsService } from 'src/app/core/services/alerts/notifications/notifications.service';
import { AuthUserService } from 'src/app/core/services/api/auth/auth-user.service';
import { ChildService } from 'src/app/core/services/api/child/child.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-child-registration',
  templateUrl: './child-registration.page.html',
  styleUrls: ['./child-registration.page.scss'],
})
export class ChildRegistrationPage implements OnInit {

  ionicForm: FormGroup;
  maxDate: string;

  isFormSubmitted = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationsService,
    private alert: AlertComponent,
    private authApiService: AuthUserService,
    private loadingService: LoadingService,
    private authService: AuthService,
    private childService: ChildService,
  ) {
    const dateNow = new Date (Date.now());
    const month = dateNow.getMonth()+1;
    this.maxDate = dateNow.getFullYear() + '-' + month + '-' + dateNow.getDate();
  }

  ngOnInit() {
    this.ionicForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      date_of_birth: ['', [Validators.required]]
    });
  }

  async addChild() {
    this.loadingService.simpleLoader('Ajout en cours...');
    this.childService.addChild(this.ionicForm.value).subscribe(
      async (res) => {
        if (res) {
          this.loadingService.dismissLoader();
          this.router.navigate(['child-registration/' + res.id + '/abilities/']);
          this.notificationService.notificationToast('Informations validées !', 'success');
        } else {
          console.log('error');
          this.loadingService.dismissLoader();
          this.alert.presentAlert('Une erreur est survenue', res, ['Réessayer']);
        }
      },
      async (err) => {
        console.log(err);
        this.loadingService.dismissLoader();
        if (
          err.error?.errors?.date_of_birth &&
          err.error?.errors?.date_of_birth[0] === 'The date of birth must be a date before or equal to today.'
          ) {
        this.alert.presentAlert(
          'Une erreur est survenue',
          // eslint-disable-next-line @typescript-eslint/quotes
          "La date d'anniversaire doit être inférieur ou égale à aujourd'hui", ['Réessayer']);
        }
        else {
        this.alert.presentAlert('Une erreur est survenue', err.error.message, ['Réessayer']);
        }
      });
  }
}
