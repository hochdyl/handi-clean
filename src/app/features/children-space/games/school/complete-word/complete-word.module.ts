import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteWordPageRoutingModule } from './complete-word-routing.module';

import { CompleteWordPage } from './complete-word.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteWordPageRoutingModule
  ],
  declarations: [CompleteWordPage]
})
export class CompleteWordPageModule {}
