/* eslint-disable @typescript-eslint/naming-convention */
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonContent } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { AlertComponent } from 'src/app/core/components/alerts/alert/alert.component';
import { CategoryPictogram } from 'src/app/core/models/categoryPictogram';
import { Child } from 'src/app/core/models/child';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { TextSpeechService } from 'src/app/core/services/alerts/text-speech/text-speech.service';
import { AuthUserService } from 'src/app/core/services/api/auth/auth-user.service';
import { CategoryPictogramService } from 'src/app/core/services/api/category-pictogram/category-pictogram.service';
import { ChildService } from 'src/app/core/services/api/child/child.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pictograms',
  templateUrl: './pictograms.page.html',
  styleUrls: ['./pictograms.page.scss'],
})
export class PictogramsPage implements OnInit {

  childId;
  userId;
  child: Child;
  categoryPictograms: CategoryPictogram[] = [];
  API_URL;
  pictograms;

  constructor(
    private loadingService: LoadingService,
    private categoryPictogramService: CategoryPictogramService,
    private route: ActivatedRoute,
    private textSpeechService: TextSpeechService,
    private zone: NgZone,
  ) {
      this.API_URL = environment.API_URL;
      // Supprimer le api/ à la fin
      this.API_URL = this.API_URL.substring(0, this.API_URL.length - 4);

    this.textToSpeech();
  }

  ngOnInit() {
    this.childId = +this.route.snapshot.paramMap.get('id');
    this.loadingService.simpleLoader('Veuillez patienter...');
    this.categoryPictogramService.get(this.childId)
      .pipe(
        tap((categoryPictograms) => {
          this.categoryPictograms = categoryPictograms;
          this.categoryPictograms.forEach(categoryPictogram => {
            if (!categoryPictogram.image.image_path.includes('/assets')) {
              categoryPictogram.image.image_path = this.API_URL + categoryPictogram.image.image_path;
            }
          });
          this.selectCategory(this.categoryPictograms[0].id);
        })
      )
      .subscribe(() => {
        setTimeout(() => this.loadingService.dismissLoader(), 1000);
      });
  }

  selectCategory(id: number) {
    const category = this.categoryPictograms.find(item => item.id === id);
    this.pictograms = category.pictograms;
    this.pictograms.forEach(pictogram => {
      if (!pictogram.image.image_path.includes('/assets')) {
        pictogram.image.image_path = this.API_URL + pictogram.image.image_path;
      }
    });
    this.textToSpeech(category.name);
  }

  textToSpeech(text: string = 'Exprime toi') {
    this.textSpeechService.speak(text);
  }

}
