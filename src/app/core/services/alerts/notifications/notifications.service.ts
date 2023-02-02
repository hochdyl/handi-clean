/* eslint-disable object-shorthand */
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    public toastController: ToastController,
    ) { }

  async notificationToast(message: string, color: string, position: any='bottom', duration: number = 3000) {
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
      ]
    });
    await toast.present();
  }
}
