import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PictogramsPage } from './pictograms.page';

const routes: Routes = [
  {
    path: '',
    component: PictogramsPage
  },
  {
    path: 'add-pictogram',
    loadChildren: () => import('./add-pictogram/add-pictogram.module').then( m => m.AddPictogramPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PictogramsPageRoutingModule {}
