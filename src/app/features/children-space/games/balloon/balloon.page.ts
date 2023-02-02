import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController, Platform } from '@ionic/angular';
import { TextSpeechService } from 'src/app/core/services/alerts/text-speech/text-speech.service';

@Component({
  selector: 'app-balloon',
  templateUrl: './balloon.page.html',
  styleUrls: ['./balloon.page.scss'],
})
export class BalloonPage implements AfterViewInit {
  @ViewChild('balloon1') balloon1: ElementRef;
  @ViewChild('balloon2') balloon2: ElementRef;
  @ViewChild('balloon3') balloon3: ElementRef;
  @ViewChild('balloon4') balloon4: ElementRef;
  @ViewChild('balloon5') balloon5: ElementRef;

  balloonHide2 = true;

  animationBalloon1;

  constructor(
    private animationCtrl: AnimationController,
    private textSpeechService: TextSpeechService,
  ) { }

  ngAfterViewInit() {
  //   this.animationBalloon1 =this.animationCtrl.create()
  // .addElement(this.balloon.nativeElement)
  // .duration(3000)
  // .iterations(Infinity)
  // .fromTo('transform', 'translateY(500px)', 'translateY(-500px)');

  // this.animationBalloon1.play();
  }

  boom($event){
   // $event.currentTarget.hidden= true;
      const animationBalloon1 =this.animationCtrl.create()
  .addElement($event.currentTarget)
  .duration(2000)
  .iterations(1)
  .fromTo('transform', 'translateY(0)', 'translateY(-910px)');
  this.textToSpeech('Youpiii');

  animationBalloon1.play();
  setTimeout(() => animationBalloon1.stop(), 3500);

  }

  textToSpeech(text: string) {
    this.textSpeechService.speak(text);
  }

}
