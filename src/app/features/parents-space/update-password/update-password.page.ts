/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from 'src/app/core/components/alerts/alert/alert.component';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { NotificationsService } from 'src/app/core/services/alerts/notifications/notifications.service';
import { AuthUserService } from 'src/app/core/services/api/auth/auth-user.service';
import { RoleService } from 'src/app/core/services/api/role/role.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.page.html',
  styleUrls: ['./update-password.page.scss'],
})
export class UpdatePasswordPage implements OnInit {

  ionicForm: FormGroup;

  isFormSubmitted = false;
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
      current_password: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    // this.loadingService.simpleLoader('Veuillez patientez...');
    // this.authApiService.getProfile(this.userId)
    //   .pipe(
    //     tap((user) => {
    //       this.user = user;
    //     })
    //   )
    //   .subscribe(() => {
    //     setTimeout(() => this.loadingService.dismissLoader(), 500);
    //   });
  }

  async updatePassword() {
    this.loadingService.simpleLoader('Modification en cours...');
    this.authApiService.updatePassword(this.userId, this.ionicForm.value).subscribe(
      async (res) => {
        if (res==='Le mot de passe a bien été modifié.') {
          this.loadingService.dismissLoader();
          this.router.navigate(['parents-space/' + this.userId]);
          this.notificationService.notificationToast('Mot de passe modifié !', 'success');
        }
        else {
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
