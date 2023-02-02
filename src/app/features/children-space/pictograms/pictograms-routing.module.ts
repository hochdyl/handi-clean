import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PictogramsPage } from './pictograms.page';

const routes: Routes = [
  {
    path: '',
    component: PictogramsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PictogramsPageRoutingModule {}
