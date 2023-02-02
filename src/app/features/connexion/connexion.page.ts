import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthUserService } from 'src/app/core/services/api/auth/auth-user.service';
import { NotificationsService } from 'src/app/core/services/alerts/notifications/notifications.service';
//import { LoadingComponent } from '../components/alerts/loading/loading.component';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { AlertComponent } from '../../core/components/alerts/alert/alert.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  ionicForm: FormGroup;

  isFormSubmitted = false;
  public logo: string;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationsService,
    private alert: AlertComponent,
    private authApiService: AuthUserService,
    private loadingService: LoadingService,
    private authService: AuthService,
  ) {
    this.logo= 'assets/logo.png';
   }

  ngOnInit() {
    this.ionicForm = this.fb.group({
      email: ['', [Validators.email,Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.min(8)]],
    });

  }

  async login() {
    this.loadingService.simpleLoader('Connexion en cours...');
    this.authApiService.login(this.ionicForm.value).subscribe(
      async (res) => {
        if (res.access_token) {
          console.log(res);
          this.authService.login(res);
          this.loadingService.dismissLoader();
          this.router.navigateByUrl('/home', { replaceUrl: true });
          this.notificationService.notificationToast('Connexion réussie !', 'success');
        } else {
          console.log('error');
          this.loadingService.dismissLoader();
          this.alert.presentAlert('Une erreur est survenue', res.error.message, ['Réessayer']);
        }
      },
      async (err) => {
        console.log(err);
        this.loadingService.dismissLoader();
        this.alert.presentAlert('Une erreur est survenue', err.error.message, ['Réessayer']);
      });
  }
}
