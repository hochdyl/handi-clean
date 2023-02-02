import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteWordPage } from './complete-word.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteWordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteWordPageRoutingModule {}
