import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PictogramsPageRoutingModule } from './pictograms-routing.module';

import { PictogramsPage } from './pictograms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PictogramsPageRoutingModule
  ],
  declarations: [PictogramsPage]
})
export class PictogramsPageModule {}
