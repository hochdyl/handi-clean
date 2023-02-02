/* eslint-disable object-shorthand */
import { Injectable } from '@angular/core';
import { TextToSpeechAdvanced } from '@awesome-cordova-plugins/text-to-speech-advanced/ngx';

@Injectable({
  providedIn: 'root'
})
export class TextSpeechService {

  constructor(
    private textSpeech: TextToSpeechAdvanced
  ) { }

  speak(text: string) {
    this.textSpeech.speak({
      text: text,
      identifier:'cancel',
      locale: 'fr-FR'
    })
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
  }
}
