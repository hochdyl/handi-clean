/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Game } from 'src/app/core/models/game';
import { Statistic } from 'src/app/core/models/statistic';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { NotificationsService } from 'src/app/core/services/alerts/notifications/notifications.service';
import { StatisticService } from 'src/app/core/services/api/statistic/statistic.service';
import { GameService } from 'src/app/core/services/api/game/game.service';
import { AlertComponent } from 'src/app/core/components/alerts/alert/alert.component';
import { CharacterChildService } from 'src/app/core/services/api/character-child/character-child.service';
import { TextSpeechService } from 'src/app/core/services/alerts/text-speech/text-speech.service';

@Component({
  selector: 'app-piano-memory',
  templateUrl: './piano-memory.page.html',
  styleUrls: ['./piano-memory.page.scss'],
})
export class PianoMemoryPage implements OnInit {

  nbErrors = 0;
  level = 0;
  timeGame = 0;
  data;
  timer = 0;
  childId;

  keysPiano= ['DO', 'RÉ', 'MI', 'FA', 'SOL','LA', 'SI','DO'];

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
    private route: ActivatedRoute,
    private notificationService: NotificationsService,
    private alert: AlertComponent,
    private router: Router,
    private textSpeechService: TextSpeechService,
  ) {
    this.startTimer();
    this.textToSpeech();
    this.childId= +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.loadingService.simpleLoader('Veuillez patientez...');
    const id = this.route.snapshot.paramMap.get('gameId');
    this.gameService.getById(+id)
      .pipe(
        tap((game) => {
          this.game = game;
          this.data = this.game.data;
          this.game.data = JSON.parse(this.data);
        })
      )
      .subscribe(() => {
        setTimeout(() => this.loadingService.dismissLoader(), 500);
      });
  }

  validated(id: number) {

    this.textToSpeech(this.keysPiano[id]);

    if (id !== this.game.data[this.level].keys[this.timeGame]) {
      this.notificationService.notificationToast('Oh mince ! Tu as perdu, réessaye !', 'danger', 'top');
      setTimeout(() =>this.textToSpeech('Oh mince ! Tu as perdu, réessaye !'),500);
      this.nbErrors += 1;
    }
    else {
      this.timeGame += 1;

      if (this.game.data[this.level].keys.length === this.timeGame) {
        this.notificationService.notificationToast('YOUPI tu as gagné !', 'success', 'top', 500);
        setTimeout(() => this.textToSpeech('YOUPI tu as gagné !'), 500);
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

        if(this.game.data.length> this.level+1) {
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
  }

  startTimer() {
    setInterval(function() {
      this.timer++;
    }.bind(this), 1000);
  }

  textToSpeech(text: string='Appuie sur les bonnes couleurs !') {
    this.textSpeechService.speak(text);
  }

}
