import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCategoryPictogramPageRoutingModule } from './add-category-pictogram-routing.module';

import { AddCategoryPictogramPage } from './add-category-pictogram.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddCategoryPictogramPageRoutingModule
  ],
  declarations: [AddCategoryPictogramPage]
})
export class AddCategoryPictogramPageModule {}
