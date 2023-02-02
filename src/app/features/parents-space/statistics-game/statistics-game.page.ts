import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Game } from 'src/app/core/models/game';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { ChildGameService } from 'src/app/core/services/api/child-game/child-game.service';
import { ChildService } from 'src/app/core/services/api/child/child.service';

@Component({
  selector: 'app-statistics-game',
  templateUrl: './statistics-game.page.html',
  styleUrls: ['./statistics-game.page.scss'],
})
export class StatisticsGamePage implements OnInit {

  games: Game[] = [];
  child;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private childGameService: ChildGameService,
    private childService: ChildService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loadingService.simpleLoader('Veuillez patientez...');
    const childId = +this.route.snapshot.paramMap.get('childId');
    this.childGameService.get(childId)
      .pipe(
        tap((games) => {
          this.games = games;
          this.games.forEach(game => {
            if (game.category_game.name === 'Mémoire') {
              game.category_game.name = 'memory';
            }
            else if (game.category_game.name === 'Identification') {
              game.category_game.name = 'identification';
            }
            else if (game.category_game.name === 'Ecole') {
              game.category_game.name = 'school';
            }
            else {
              game.category_game.name = 'free';
            }
          });
          this.games = this.games.filter(game => game.category_game.name !== 'free' );
          console.log(this.games);
          this.childService.getById(childId)
            .pipe(
              tap((child) => {
                this.child = child;
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

}
