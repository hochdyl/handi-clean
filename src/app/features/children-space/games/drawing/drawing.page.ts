import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { Base64ToGallery, Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { AlertComponent } from 'src/app/core/components/alerts/alert/alert.component';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { NotificationsService } from 'src/app/core/services/alerts/notifications/notifications.service';
import { TextSpeechService } from 'src/app/core/services/alerts/text-speech/text-speech.service';
import { DrawingService } from 'src/app/core/services/api/drawing/drawing.service';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.page.html',
  styleUrls: ['./drawing.page.scss'],
})
export class DrawingPage implements AfterViewInit {

  @ViewChild('imageCanvas', { static: false }) canvas: any;
  canvasElement: any;
  saveX: number;
  saveY: number;

  selectedColor = '#c2281d';
  colors = ['#c2281d', '#de722f', '#F4F130', '#5db37e', '#459cde', '#4250ad', '#802fa3'];

  drawing = false;
  lineWidth = 10;

  childId;

  constructor(
    private plt: Platform,
    // private base64ToGallery: Base64ToGallery,
    private notificationService: NotificationsService,
    private textSpeechService: TextSpeechService,
    private http: HttpClient,
    private alert: AlertComponent,
    private loadingService: LoadingService,
    private drawingService: DrawingService,
    private route: ActivatedRoute,
  ) {
    this.textToSpeech();
  }

  ngAfterViewInit() {
    this.childId = +this.route.snapshot.paramMap.get('id');

    // Set the Canvas Element and its size
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width() - 160;
    this.canvasElement.height = this.plt.height() - 42;
    console.log(this.plt.width());
  }

  startDrawing(ev) {
    this.drawing = true;
    const canvasPosition = this.canvasElement.getBoundingClientRect();

    this.saveX = ev.pageX - canvasPosition.x;
    this.saveY = ev.pageY - canvasPosition.y;
  }

  endDrawing() {
    this.drawing = false;
  }

  selectColor(color) {
    this.selectedColor = color;
  }

  moved(ev) {
    //console.log('evement', ev);
    if (!this.drawing) { return; };

    const canvasPosition = this.canvasElement.getBoundingClientRect();
    const ctx = this.canvasElement.getContext('2d');

    let currentX = 0;
    let currentY = 0;

    if (ev.pageX || ev.pageY) {
      currentX = ev.pageX - canvasPosition.x;
      currentY = ev.pageY - canvasPosition.y;
    }
    else {
      currentX = ev.changedTouches[0].pageX - canvasPosition.x;
      currentY = ev.changedTouches[0].pageY - canvasPosition.y;
    }

    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.selectedColor;
    ctx.lineWidth = this.lineWidth;

    ctx.beginPath();
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();

    ctx.stroke();

    this.saveX = currentX;
    this.saveY = currentY;
  }

  async exportCanvasImage() {
    this.loadingService.simpleLoader('Veuillez patientez...');
    const dataUrl = this.canvasElement.toDataURL();

    const base64 = await fetch(dataUrl);
    const blobBdd = await base64.blob();

    const formData = new FormData();
    formData.append('image_path', blobBdd);

    // Clear the current canvas
    const ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.http.request(this.drawingService.add(this.childId, formData)).subscribe(
      async (res) => {
        if (res) {
          setTimeout(() => this.loadingService.dismissLoader(), 500);
          this.notificationService.notificationToast('Dessin ajoutée !', 'success');
          this.textToSpeech('Bravo !');
        } else {
          console.log('error');
          setTimeout(() => this.loadingService.dismissLoader(), 500);
          this.alert.presentAlert('Une erreur est survenue', res, ['Réessayer']);
        }
      },
      async (err) => {
        console.log(err);
        setTimeout(() => this.loadingService.dismissLoader(), 500);
        this.alert.presentAlert('Une erreur est survenue', err.error.message, ['Réessayer']);
      });

    if (!this.plt.is('desktop')) {
      // const options: Base64ToGalleryOptions = { prefix: '_img', mediaScanner: true };
      //
      // this.base64ToGallery.base64ToGallery(dataUrl, options).then(
      //   async res => {
      //   },
      //   err => console.log('Error saving image to gallery ', err)
      // );
    } else {
      // Fallback for Desktop
      const data = dataUrl.split(',')[1];
      const blob = this.b64toBlob(data, 'image/png');

      const a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = 'dessins.png';
      this.notificationService.notificationToast('Dessin enregistré !', 'success', 'bottom');
      this.textToSpeech('Dessin enregistré !');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  // https://forum.ionicframework.com/t/save-base64-encoded-image-to-specific-filepath/96180/3
  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  textToSpeech(text: string = 'Dessine !') {
    this.textSpeechService.speak(text);
  }

  sizePen(size: number){
    this.lineWidth=size;
  }

}
