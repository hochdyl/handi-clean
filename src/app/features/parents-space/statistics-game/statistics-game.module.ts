import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatisticsGamePageRoutingModule } from './statistics-game-routing.module';

import { StatisticsGamePage } from './statistics-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticsGamePageRoutingModule
  ],
  declarations: [StatisticsGamePage]
})
export class StatisticsGamePageModule {}
