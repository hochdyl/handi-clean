import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { TextSpeechService } from 'src/app/core/services/alerts/text-speech/text-speech.service';
import { CharacterChildService } from 'src/app/core/services/api/character-child/character-child.service';
import { ChildService } from 'src/app/core/services/api/child/child.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.page.html',
  styleUrls: ['./animals.page.scss'],
})
export class AnimalsPage implements OnInit {

  currentAnimal;
  animals = [];

  constructor(
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private textSpeechService: TextSpeechService,
  ) {
    this.textToSpeech();
   }

  async ngOnInit() {
    this.loadingService.simpleLoader('Veuillez patientez...');
    this.animals = [
      {name: 'Âne', image : 'assets/child-zone/jeux/animaux/ane.png'},
      {name: 'Canard', image :'assets/child-zone/jeux/animaux/canard.png'},
      {name: 'Chèvre', image :'assets/child-zone/jeux/animaux/chevre.png'},
      {name: 'Cochon', image :'assets/child-zone/jeux/animaux/cochon.png'},
      {name: 'Éléphant', image :'assets/child-zone/jeux/animaux/elephant.png'},
      {name: 'Lion', image :'assets/child-zone/jeux/animaux/lion.png'},
      {name: 'Loup', image :'assets/child-zone/jeux/animaux/loup.png'},
      {name: 'Poule', image :'assets/child-zone/jeux/animaux/poule.png'},

    ];
      setTimeout(() => this.loadingService.dismissLoader(), 500);
  }

  chooseAnimal(animalId: number) {
    this.currentAnimal = this.animals[animalId];
    console.log(this.currentAnimal);
    this.textToSpeech(this.currentAnimal.name);
  }

  textToSpeech(text: string='Choisi un animal !') {
    this.textSpeechService.speak(text);
  }
}
