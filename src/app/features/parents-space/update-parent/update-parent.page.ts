/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AlertComponent } from 'src/app/core/components/alerts/alert/alert.component';
import { Role } from 'src/app/core/models/role';
import { User } from 'src/app/core/models/user';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { NotificationsService } from 'src/app/core/services/alerts/notifications/notifications.service';
import { AuthUserService } from 'src/app/core/services/api/auth/auth-user.service';
import { RoleService } from 'src/app/core/services/api/role/role.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-update-parent',
  templateUrl: './update-parent.page.html',
  styleUrls: ['./update-parent.page.scss'],
})
export class UpdateParentPage implements OnInit {

  ionicForm: FormGroup;

  isFormSubmitted = false;
  roles: Role[] = [];
  public logo: string;
  user: User;
  userId;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationsService,
    private alert: AlertComponent,
    private authApiService: AuthUserService,
    private loadingService: LoadingService,
    private authService: AuthService,
    private roleService: RoleService,
    private route: ActivatedRoute,
  ) {
    this.userId = +this.route.snapshot.paramMap.get('id');
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
      role_id: ['', [Validators.required]],
    });

    this.loadingService.simpleLoader('Veuillez patientez...');
    this.authApiService.getProfile(this.userId)
      .pipe(
        tap((user) => {
          this.user = user;
          this.roleService.get()
            .pipe(
              tap((roles) => {
                this.roles = roles;
              })
            )
            .subscribe(() => {
              setTimeout(() => console.log(), 500);
            });
        })
      )
      .subscribe(() => {
        this.ionicForm.patchValue({
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          phone: this.user.phone,
          address: this.user.address,
          postal_code: this.user.postal_code,
          city: this.user.city,
          country: this.user.country,
          email: this.user.email,
          role_id: this.user.role_id,
        });
        setTimeout(() => this.loadingService.dismissLoader(), 500);
      });
  }

  async udpate() {
    this.loadingService.simpleLoader('Modification en cours...');
    this.authApiService.updateProfile(this.userId, this.ionicForm.value).subscribe(
      async (res) => {
        if (res) {
          this.loadingService.dismissLoader();
          this.router.navigate(['parents-space/' + this.userId]);
          this.notificationService.notificationToast('Informations enregistrées !', 'success');
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
