/* eslint-disable @typescript-eslint/naming-convention */
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController, Gesture, GestureController } from '@ionic/angular';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.page.html',
  styleUrls: ['./animations.page.scss'],
})
export class AnimationsPage implements AfterViewInit {
  @ViewChild('rectangle') rectangle: ElementRef;
  @ViewChild('squareMulticolor') squareMulticolor: ElementRef;
  @ViewChild('squareMove') squareMove: ElementRef;
  @ViewChild('squareBig') squareBig: ElementRef;

  @ViewChild('rectangle2') rectangle2: ElementRef;
  @ViewChild('squareMulticolor2') squareMulticolor2: ElementRef;
  @ViewChild('squareMove2') squareMove2: ElementRef;
  @ViewChild('squareBig2') squareBig2: ElementRef;

  private backgrounds: string[] = [
    'rgba(0, 0, 255, 0.5)',
    'rgba(103, 219, 103)',
    'rgba(255, 0, 0, 0.5)',
    'rgba(255, 255, 0, 0.5)',
    'rgba(255, 0, 255, 0.5)',
    'rgba(0, 255, 255, 0.5)'
  ];
  private currentColor = 'rgba(0, 0, 255, 0.5)';

  private animationMulticolor;
  private animationMove;
  private animationBig;

  private startedMulticolor = false;
  private startedBig = false;
  private startedMove = false;

  private animationMulticolor2;
  private animationMove2;
  private animationBig2;

  private startedMulticolor2 = false;
  private startedBig2 = false;
  private startedMove2 = false;

  constructor(
    private gestureCtrl: GestureController,
    private animationCtrl: AnimationController,
  ) { }


  ngAfterViewInit() {
    const gesture = this.gestureCtrl.create({
      el: this.rectangle.nativeElement,
      threshold: 0,
      onStart: () => { this.onStart(); },
      gestureName: ''
    });
    gesture.enable();

    this.animationMulticolor = this.animationCtrl.create()
      .addElement(this.squareMulticolor.nativeElement)
      .duration(3000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, background: 'red' },
        { offset: 0.72, background: 'var(--background)' },
        { offset: 1, background: 'green' }
      ]);

    this.animationMove = this.animationCtrl.create()
      .addElement(this.squareMove.nativeElement)
      .duration(2000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'scale(1) rotate(0)' },
        { offset: 0.5, transform: 'scale(1.2) rotate(45deg)' },
        { offset: 1, transform: 'scale(1) rotate(45deg)' }
      ]);

    this.animationBig = this.animationCtrl.create()
      .addElement(this.squareBig.nativeElement)
      .duration(2000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'scale(1))', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.2)', opacity: '0.3' },
        { offset: 1, transform: 'scale(1)', opacity: '1' }
      ]);

      const gesture2 = this.gestureCtrl.create({
        el: this.rectangle2.nativeElement,
        threshold: 0,
        onStart: () => { this.onStart2(); },
        gestureName: ''
      });
      gesture2.enable();

      this.animationMulticolor2 = this.animationCtrl.create()
        .addElement(this.squareMulticolor2.nativeElement)
        .duration(3000)
        .iterations(Infinity)
        .keyframes([
          { offset: 0, background: 'red' },
          { offset: 0.72, background: 'var(--background)' },
          { offset: 1, background: 'green' }
        ]);

      this.animationMove2 = this.animationCtrl.create()
        .addElement(this.squareMove2.nativeElement)
        .duration(2000)
        .iterations(Infinity)
        .keyframes([
          { offset: 0, transform: 'scale(1) rotate(0)' },
          { offset: 0.5, transform: 'scale(1.2) rotate(45deg)' },
          { offset: 1, transform: 'scale(1) rotate(45deg)' }
        ]);

      this.animationBig2 = this.animationCtrl.create()
        .addElement(this.squareBig2.nativeElement)
        .duration(2000)
        .iterations(Infinity)
        .keyframes([
          { offset: 0, transform: 'scale(1))', opacity: '1' },
          { offset: 0.5, transform: 'scale(1.2)', opacity: '0.3' },
          { offset: 1, transform: 'scale(1)', opacity: '1' }
        ]);
  }

  multicolor() {
    if (!this.startedMulticolor) {
      this.animationMulticolor.play();
      this.startedMulticolor = true;
    }
    else {
      this.animationMulticolor.pause();
      this.startedMove = false;
    }
  }

  big() {
    if (!this.startedBig) {
      this.animationBig.play();
      this.startedBig = true;
    }
    else {
      this.animationBig.pause();
      this.startedBig = false;
    }
  }

  move() {
    if (!this.startedMove) {
      this.animationMove.play();
      this.startedMove = true;
    }
    else {
      this.animationMove.pause();
      this.startedMove = false;
    }
  }

  multicolor2() {
    if (!this.startedMulticolor2) {
      this.animationMulticolor2.play();
      this.startedMulticolor2 = true;
    }
    else {
      this.animationMulticolor2.pause();
      this.startedMove2 = false;
    }
  }

  big2() {
    if (!this.startedBig2) {
      this.animationBig2.play();
      this.startedBig2 = true;
    }
    else {
      this.animationBig2.pause();
      this.startedBig2 = false;
    }
  }

  move2() {
    if (!this.startedMove2) {
      this.animationMove2.play();
      this.startedMove2 = true;
    }
    else {
      this.animationMove2.pause();
      this.startedMove2 = false;
    }
  }

  private onStart() {
    this.rectangle.nativeElement.style.setProperty('background', this.getRandomBackground());
  }

  private onStart2() {
    this.rectangle2.nativeElement.style.setProperty('background', this.getRandomBackground());
  }

  private getRandomBackground() {
    const options = this.backgrounds.filter(bg => bg !== this.currentColor);
    this.currentColor = options[Math.floor(Math.random() * options.length)];

    return this.currentColor;
  }
}
