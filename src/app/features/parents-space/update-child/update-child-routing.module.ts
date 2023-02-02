import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateChildPage } from './update-child.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateChildPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateChildPageRoutingModule {}
