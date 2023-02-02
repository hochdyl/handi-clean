import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PictogramsPageRoutingModule } from './category-pictograms-routing.module';

import { CategoryPictogramsPage } from './category-pictograms.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PictogramsPageRoutingModule,
    Ng2SearchPipeModule,
  ],
  declarations: [CategoryPictogramsPage]
})
export class PictogramsPageModule {}
