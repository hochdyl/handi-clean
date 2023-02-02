/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AlertComponent } from 'src/app/core/components/alerts/alert/alert.component';
import { AuthUser } from 'src/app/core/models/auth_user';
import { Role } from 'src/app/core/models/role';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { NotificationsService } from 'src/app/core/services/alerts/notifications/notifications.service';
import { AuthUserService } from 'src/app/core/services/api/auth/auth-user.service';
import { RoleService } from 'src/app/core/services/api/role/role.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  ionicForm: FormGroup;

  isFormSubmitted = false;
  roles: Role[] = [];
  public logo: string;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationsService,
    private alert: AlertComponent,
    private authApiService: AuthUserService,
    private loadingService: LoadingService,
    private authService: AuthService,
    private roleService: RoleService,
  ) {
    this.logo = 'assets/logo.png';
  }

  async ngOnInit() {
    this.ionicForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      postal_code: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      country: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email, Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role_id: ['', [Validators.required]],
    });

    this.loadingService.simpleLoader('Veuillez patientez...');

    this.roleService.get()
      .pipe(
        tap((roles) => {
          this.roles = roles;
        })
      )
      .subscribe(() => {
        setTimeout(() => this.loadingService.dismissLoader(), 500);
      });
  }

  getLoginCredentials() {
    let credentials: AuthUser;
    return credentials = {
      email: this.ionicForm.get('email').value,
      password: this.ionicForm.get('password').value,
    };
  }

  async register() {
    this.loadingService.simpleLoader('Inscription en cours...');
    this.authApiService.register(this.ionicForm.value).subscribe(
      async (res) => {
        if (res) {
          this.notificationService.notificationToast('Inscription réussie !', 'success');
          this.authApiService.login(this.getLoginCredentials()).subscribe(
            async (res2) => {
              if (res2.access_token) {
                this.authService.login(res2);
                this.loadingService.dismissLoader();
                this.router.navigateByUrl('/home', { replaceUrl: true });
                this.notificationService.notificationToast('Vous êtes connecté !', 'success');
              }
              else {
                console.log('error');
                this.loadingService.dismissLoader();
                this.alert.presentAlert('Une erreur est survenue', res2.error.message, ['Réessayer']);
              }
            },
            async (err) => {
              console.log(err);
              this.loadingService.dismissLoader();
              this.alert.presentAlert('Une erreur est survenue', err.error.message, ['Réessayer']);
            });
        }
        else {
          this.loadingService.dismissLoader();
          this.alert.presentAlert('Une erreur est survenue', res, ['Réessayer']);
        }
      },
      async (err) => {
        console.log(err);
        this.loadingService.dismissLoader();
        if (err.error.message === 'The given data was invalid') {
          this.alert.presentAlert('Une erreur est survenue', 'Adresse mail déjà utilisée', ['Réessayer']);
        }
        else {
          this.alert.presentAlert('Une erreur est survenue', err.error.message, ['Réessayer']);
        }
      });
  }
}
