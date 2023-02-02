import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PianoMemoryPageRoutingModule } from './piano-memory-routing.module';

import { PianoMemoryPage } from './piano-memory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PianoMemoryPageRoutingModule
  ],
  declarations: [PianoMemoryPage]
})
export class PianoMemoryPageModule {}
