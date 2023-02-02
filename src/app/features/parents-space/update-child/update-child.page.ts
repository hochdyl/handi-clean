/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AlertComponent } from 'src/app/core/components/alerts/alert/alert.component';
import { Child } from 'src/app/core/models/child';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { NotificationsService } from 'src/app/core/services/alerts/notifications/notifications.service';
import { AbilityService } from 'src/app/core/services/api/ability/ability.service';
import { ChildGameService } from 'src/app/core/services/api/child-game/child-game.service';
import { ChildService } from 'src/app/core/services/api/child/child.service';

@Component({
  selector: 'app-update-child',
  templateUrl: './update-child.page.html',
  styleUrls: ['./update-child.page.scss'],
})
export class UpdateChildPage implements OnInit {

  child: Child;
  ionicFormChild: FormGroup;
  ionicFormAbility: FormGroup;

  isFormSubmitted = false;
  maxDate;
  userId;
  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private childService: ChildService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private notificationService: NotificationsService,
    private alert: AlertComponent,
    private abilityService: AbilityService

  ) {
    const dateNow = new Date (Date.now());
    const month = dateNow.getMonth()+1;
    this.maxDate = dateNow.getFullYear() + '-' + month + '-' + dateNow.getDate();
    this.userId = +this.route.snapshot.paramMap.get('id');
   }

  async ngOnInit() {
    this.ionicFormChild = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      date_of_birth: ['', [Validators.required]]
    });

    this.ionicFormAbility = this.fb.group({
      alone: ['', [Validators.required]],
      read: ['', [Validators.required]],
      deaf: ['', [Validators.required]],
      know_image: ['', [Validators.required]],
      know_color: ['', [Validators.required]],
      know_word: ['', [Validators.required]],
      write: ['', [Validators.required]],
    });

    this.loadingService.simpleLoader('Veuillez patientez...');
    const childId = +this.route.snapshot.paramMap.get('childId');
    this.childService.getById(childId)
      .pipe(
        tap((child) => {
          this.child = child;
        })
      )
      .subscribe(() => {
        this.ionicFormChild.patchValue({
          firstname: this.child.firstname,
          lastname: this.child.lastname,
          date_of_birth: this.child.date_of_birth,
        });
        this.ionicFormAbility.patchValue({
          alone: this.child.ability.alone ? 1 : 0,
          read: this.child.ability.read? 1 : 0,
          deaf: this.child.ability.deaf? 1 : 0,
          know_image: this.child.ability.know_image? 1 : 0,
          know_color: this.child.ability.know_color? 1 : 0,
          know_word: this.child.ability.know_word? 1 : 0,
          write: this.child.ability.write? 1 : 0,
        });
        setTimeout(() => this.loadingService.dismissLoader(), 500);
      });
  }

  async updateChild() {
    this.loadingService.simpleLoader('Modification en cours...');
    this.childService.updateChild(this.child.id, this.ionicFormChild.value).subscribe(
      async (res) => {
        if (res) {
          this.abilityService.updateAbility(this.child.ability.id, this.ionicFormAbility.value).subscribe(
            async (res2) => {
              if (res2) {
                this.loadingService.dismissLoader();
                this.router.navigate(['parents-space/' + this.userId]);
                this.notificationService.notificationToast('Informations modifiés !', 'success');
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
          err.error.errors.date_of_birth &&
          err.error.errors.date_of_birth[0] === 'The date of birth must be a date before or equal to today.'
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
