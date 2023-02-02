import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BalloonPage } from './balloon.page';

const routes: Routes = [
  {
    path: '',
    component: BalloonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BalloonPageRoutingModule {}
