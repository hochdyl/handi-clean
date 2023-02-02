import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCategoryPictogramPage } from './add-category-pictogram.page';

const routes: Routes = [
  {
    path: '',
    component: AddCategoryPictogramPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCategoryPictogramPageRoutingModule {}
