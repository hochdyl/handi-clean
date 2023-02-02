import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ServicesService } from '../../../../core/services/services.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  timer = 0;
  ingredients = [];
  test1;
  credentials = {
    email: 'clara.vesval@ynov.com',
    password: 'clara1606'
  };
  logo: string;

  constructor(private service: ServicesService) {
    this.startTimer();
    this.logo= 'assets/logo.png';
  }

  startTimer() {
    setInterval(function() {
      this.timer++;
    }.bind(this), 1000);

    // this.service.get()
    //   .pipe(
    //     tap((ingredients) => {
    //       ingredients.forEach((ingredient) => {
    //         this.ingredients.push(ingredient);

    //       });
    //     })
    //   )
    //   .subscribe(() => {
    //     //console.table(this.ingredients);
    //     console.log(this.ingredients);
    //   });


    // this.service.login(this.credentials).subscribe(
    //   async (res) => {
    //     if(res.success === false) {
    //      console.log('error');
    //     } else {
    //       console.log(res);
    //       this.test1 = res;
    //       this.service.user('11|zUzKq4En82V8zHvcsdKj7cjtAuWkVBe8i58CHXll').subscribe(
    //         async (res2) => {
    //           console.log(res2);
    //         },
    //       async (err) => {
    //         console.log(err);
    //         // await loading.onDidDismiss();
    //         // this.alert.presentAlert("Un problème est survenu", err.error.error, ['Réessayer']);
    //      }
    //     );
    //     }
    //   },
    //   async (err) => {
    //     console.log(err);
    //     // await loading.onDidDismiss();
    //     // this.alert.presentAlert("Un problème est survenu", err.error.error, ['Réessayer']);
    //   }
    // );
  };
}
