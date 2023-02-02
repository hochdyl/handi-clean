import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticsGamePage } from './statistics-game.page';

const routes: Routes = [
  {
    path: '',
    component: StatisticsGamePage
  },
  {
    path: ':gameId/statistics',
    loadChildren: () => import('./statistics/statistics.module').then( m => m.StatisticsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsGamePageRoutingModule {}
