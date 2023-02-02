/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Character } from 'src/app/core/models/character';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { CharacterChildService } from 'src/app/core/services/api/character-child/character-child.service';
import { ChildService } from 'src/app/core/services/api/child/child.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage {

  child;
  childId;
  imageCharacter;
  characters: Character[]= [];

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private childService: ChildService,
    private characterChildService: CharacterChildService,
    private route: ActivatedRoute,

  ) {
    this.childId = +this.route.snapshot.paramMap.get('id');
   }

  async ionViewWillEnter() {
    this.loadingService.simpleLoader('Veuillez patientez...');
    this.childService.getById(this.childId)
      .pipe(
        tap((child) => {
          this.child = child;
          if (child.character_id !== null) {
            this.imageCharacter = child.character.image.image_path;
          }
          this.characterChildService.get(child.id)
            .pipe(
              tap((characters) => {
                this.characters = characters;
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

  chooseCharacter(characterId: number) {
    this.loadingService.simpleLoader('Veuillez patientez...');
    this.childService.updateChildCharacter(this.childId, {character_id: characterId})
    .pipe(
      tap((child) => {
        this.child = child;
        if (child.character_id !== null) {
          this.imageCharacter = child.character.image.image_path;
        }
      })
    )
    .subscribe(() => {
      setTimeout(() => this.loadingService.dismissLoader(), 500);
    });
  }

  valide() {
    this.router.navigateByUrl('/children-space/' + this.child.id, { replaceUrl: true });
  }

}
