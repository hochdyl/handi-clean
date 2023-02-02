/* eslint-disable object-shorthand */
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {

  constructor(public toastController: ToastController) {}

  async presentToast(message: string, color: string, position: any = 'bottom', duration: number = 3000) {
    const toast = await this.toastController.create({
      message: message,
      position: position,
      duration: duration,
      color: color,
      buttons: [
        {
          text: 'Fermer',
          role: 'cancel',
        }
      ],
    });
    
    await toast.present();
  }

}
