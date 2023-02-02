import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { Storage } from '@ionic/storage-angular';
import { tap } from 'rxjs/operators';
import { Child } from 'src/app/core/models/child';
import { Game } from 'src/app/core/models/game';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { ChildService } from 'src/app/core/services/api/child/child.service';
import { ChildGameService } from 'src/app/core/services/api/child-game/child-game.service';

@Component({
  selector: 'app-children-space',
  templateUrl: './children-space.page.html',
  styleUrls: ['./children-space.page.scss'],
})
export class ChildrenSpacePage {

  imageCharacter;
  child: Child;
  games: Game[] = [];

  constructor(
    private screenOrientation: ScreenOrientation,
    private router: Router,
    private loadingService: LoadingService,
    private childService: ChildService,
    private childGameService: ChildGameService,
    private route: ActivatedRoute,
    private storage: Storage,
  ) {
    this.screenOrientation.unlock();
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }


  async ionViewWillEnter() {
    this.loadingService.simpleLoader('Veuillez patientez...');
    const id = this.route.snapshot.paramMap.get('id');
    await this.storage.create();
    this.childService.getById(+id)
      .pipe(
        tap((child) => {
          this.child = child;
          this.storage.set('CHILD', child.id);
          if (child.character_id !== null) {
            this.imageCharacter = child.character.image.image_path;
          }
          this.childGameService.get(child.id)
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
              })
            )
            .subscribe(() => {
              setTimeout(() => this.loadingService.dismissLoader(), 500);
            });
        })
      )
      .subscribe(() => {
        //setTimeout(() => this.loadingService.dismissLoader(), 500);
      });
  }

  getCharacters() {
    console.log('characters');
  }

}
