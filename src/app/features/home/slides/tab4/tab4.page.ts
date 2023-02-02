import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  public imgConnexion: string;

  constructor(storage: Storage) {
    this.imgConnexion= 'assets/home/handicap.jpg';
    storage.set('FIRST_VISIT', true);
   }
}
