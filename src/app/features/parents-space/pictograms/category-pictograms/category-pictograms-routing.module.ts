import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryPictogramsPage } from './category-pictograms.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryPictogramsPage
  },
  {
    path: 'add-category-pictogram',
    loadChildren: () => import('./add-category-pictogram/add-category-pictogram.module').then( m => m.AddCategoryPictogramPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PictogramsPageRoutingModule {}
