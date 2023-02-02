import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPictogramPageRoutingModule } from './add-pictogram-routing.module';

import { AddPictogramPage } from './add-pictogram.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddPictogramPageRoutingModule
  ],
  declarations: [AddPictogramPage]
})
export class AddPictogramPageModule {}
