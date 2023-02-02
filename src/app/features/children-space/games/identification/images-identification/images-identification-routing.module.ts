import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagesIdentificationPage } from './images-identification.page';

const routes: Routes = [
  {
    path: '',
    component: ImagesIdentificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagesIdentificationPageRoutingModule {}
