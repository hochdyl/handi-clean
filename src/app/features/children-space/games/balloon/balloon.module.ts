import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BalloonPageRoutingModule } from './balloon-routing.module';

import { BalloonPage } from './balloon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BalloonPageRoutingModule
  ],
  declarations: [BalloonPage]
})
export class BalloonPageModule {}
