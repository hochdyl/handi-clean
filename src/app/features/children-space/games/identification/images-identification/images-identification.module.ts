import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagesIdentificationPageRoutingModule } from './images-identification-routing.module';

import { ImagesIdentificationPage } from './images-identification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagesIdentificationPageRoutingModule
  ],
  declarations: [ImagesIdentificationPage]
})
export class ImagesIdentificationPageModule {}
