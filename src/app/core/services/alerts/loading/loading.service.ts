/* eslint-disable object-shorthand */
import { Injectable } from '@angular/core';
import {  LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(public loadingController: LoadingController) { }

  // Simple loader
  async simpleLoader(message, timeout = 5000) {
    this.loadingController.create({
      message: message,
      spinner: 'bubbles',
      duration: timeout
    }).then((response) => {
      response.present();
    });
  }

  // Dismiss loader
  dismissLoader() {
    this.loadingController.dismiss();
  }
}

