/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AlertComponent } from 'src/app/core/components/alerts/alert/alert.component';
import { Game } from 'src/app/core/models/game';
import { Statistic } from 'src/app/core/models/statistic';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { NotificationsService } from 'src/app/core/services/alerts/notifications/notifications.service';
import { TextSpeechService } from 'src/app/core/services/alerts/text-speech/text-speech.service';
import { CharacterChildService } from 'src/app/core/services/api/character-child/character-child.service';
import { ChildService } from 'src/app/core/services/api/child/child.service';
import { GameService } from 'src/app/core/services/api/game/game.service';
import { StatisticService } from 'src/app/core/services/api/statistic/statistic.service';

@Component({
  selector: 'app-images-identification',
  templateUrl: './images-identification.page.html',
  styleUrls: ['./images-identification.page.scss'],
})
export class ImagesIdentificationPage implements OnInit {

  nbErrors = 0;
  level = 0;
  timeGame = 0;
  data;
  timer = 0;
  childId;
  imageCharacter;
  words;

  game: Game =
    {
      id: 1,
      name: '',
      data: [
        {
          level: 1,
        },
      ],
      category_id: '',
      category_game:
      {
        id: 1,
        name: '',
      },
      url: '',
    };

  constructor(
    private loadingService: LoadingService,
    private gameService: GameService,
    private statisticService: StatisticService,
    private characterChildService: CharacterChildService,
    private childService: ChildService,
    private route: ActivatedRoute,
    private notificationService: NotificationsService,
    private alert: AlertComponent,
    private router: Router,
    private textSpeechService: TextSpeechService,
  ) {
    this.startTimer();
    this.textToSpeech();
    this.childId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.loadingService.simpleLoader('Veuillez patientez...');
    const gameId = +this.route.snapshot.paramMap.get('gameId');
    this.gameService.getById(gameId)
      .pipe(
        tap((game) => {
          this.game = game;
          this.data = this.game.data;
          this.game.data = JSON.parse(this.data);
          console.log(this.game);
          this.childService.getById(this.childId)
            .pipe(
              tap((child) => {
                if (child.character_id !== null) {
                  this.imageCharacter = child.character.image.image_path;
                }
              })
            )
            .subscribe(() => {
              setTimeout(() => console.log(''), 500);
            });
        })
      )
      .subscribe(() => {
        setTimeout(() => this.loadingService.dismissLoader(), 500);
      });
  }

  validated(response: string) {

    this.textToSpeech(response);
    if (response !== this.game.data[this.level].response) {
      this.notificationService.notificationToast('Oh mince ! Tu as perdu, réessaye !', 'danger', 'top');
      this.textToSpeech('Oh mince ! Tu as perdu, réessaye !');
      this.nbErrors += 1;
    }
    else {
      this.timeGame += 1;

      this.notificationService.notificationToast('YOUPI tu as gagné !', 'success', 'top', 500);
      this.textToSpeech('YOUPI tu as gagné !');
      const statistic: Statistic = {
        child_id: this.childId,
        level: this.level + 1,
        nb_errors: this.nbErrors,
        time: this.timer,
      };
      this.statisticService.addStatistic(this.childId, this.game.id, statistic).subscribe(
        async (res) => {
          if (res) {
            console.log('ok');
          } else {
            console.log('error');
          }
        },
        async (err) => {
          console.log(err);
        });

      this.timer = 0;
      this.nbErrors = 0;
      this.timeGame = 0;

      if (this.game.data.length > this.level + 1) {
        setTimeout(() => this.level += 1, 500);
      }
      else {
        this.characterChildService.addCharacter(this.childId, this.game.id).subscribe(
          async (res) => {
            if (res) {
              console.log('ok character');
              this.textToSpeech('Tu as gagné un personnage !');
            } else {
              console.log('error character');
            }
          },
          async (err) => {
            console.log(err);
          });
        this.notificationService.notificationToast('Tu as fini, BRAVO !', 'success');
        this.textToSpeech('Tu as fini, BRAVO !');
        setTimeout(() => this.router.navigate(['children-space/' + this.childId]), 1000);
      }
    }
  }

  startTimer() {
    setInterval(function() {
      this.timer++;
    }.bind(this), 1000);
  }

  textToSpeech(text: string = 'Appuie sur la bonne image !') {
    this.textSpeechService.speak(text);
  }

}
