import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPictogramPage } from './add-pictogram.page';

const routes: Routes = [
  {
    path: '',
    component: AddPictogramPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPictogramPageRoutingModule {}
