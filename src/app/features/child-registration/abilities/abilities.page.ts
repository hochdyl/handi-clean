/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from 'src/app/core/components/alerts/alert/alert.component';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { NotificationsService } from 'src/app/core/services/alerts/notifications/notifications.service';
import { AbilityService } from 'src/app/core/services/api/ability/ability.service';
import { AuthUserService } from 'src/app/core/services/api/auth/auth-user.service';
import { ChildService } from 'src/app/core/services/api/child/child.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.page.html',
  styleUrls: ['./abilities.page.scss'],
})
export class AbilitiesPage implements OnInit {

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
    private abilityService: AbilityService,
    private route: ActivatedRoute,
  ) {
    const dateNow = new Date(Date.now());
    const month = dateNow.getMonth() + 1;
    this.maxDate = dateNow.getFullYear() + '-' + month + '-' + dateNow.getDate();
  }

  ngOnInit() {
    this.ionicForm = this.fb.group({
      alone: ['', [Validators.required]],
      read: ['', [Validators.required]],
      deaf: ['', [Validators.required]],
      know_image: ['', [Validators.required]],
      know_color: ['', [Validators.required]],
      know_word: ['', [Validators.required]],
      write: ['', [Validators.required]],
    });
  }

  async addAbility() {
    this.loadingService.simpleLoader('Ajout en cours...');
    const id = this.route.snapshot.paramMap.get('id');
    this.abilityService.addAbility(+id, this.ionicForm.value).subscribe(
      async (res) => {
        if (res) {
          console.log(res);
          this.loadingService.dismissLoader();
          this.router.navigateByUrl('/home', { replaceUrl: true });
          this.notificationService.notificationToast('Enfant ajouté !', 'success');
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
