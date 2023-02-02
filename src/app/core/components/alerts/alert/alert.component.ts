/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent{

  constructor(
    private alertController: AlertController,
  ) { }

  async presentAlert(header = 'Échec', message, buttons = ['Ok'], waiting = false) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: buttons,
    });

    alert.present();
    if(waiting === true) {
      return alert.onDidDismiss();
    }
    return null;
  }
}
