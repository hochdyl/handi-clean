import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChildrenSpacePageRoutingModule } from './children-space-routing.module';

import { ChildrenSpacePage } from './children-space.page';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChildrenSpacePageRoutingModule,
    IonicStorageModule.forRoot(),
  ],
  declarations: [ChildrenSpacePage]
})
export class ChildrenSpacePageModule {}
