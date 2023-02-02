import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateParentPageRoutingModule } from './update-parent-routing.module';

import { UpdateParentPage } from './update-parent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdateParentPageRoutingModule
  ],
  declarations: [UpdateParentPage]
})
export class UpdateParentPageModule {}
