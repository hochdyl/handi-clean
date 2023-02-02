import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateChildPageRoutingModule } from './update-child-routing.module';

import { UpdateChildPage } from './update-child.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdateChildPageRoutingModule
  ],
  declarations: [UpdateChildPage]
})
export class UpdateChildPageModule {}
