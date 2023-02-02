import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParentsSpacePage } from './parents-space.page';

const routes: Routes = [
  {
    path: '',
    component: ParentsSpacePage
  },
  {
    path: 'child/:childId/category-pictograms',
    loadChildren: () => import('./pictograms/category-pictograms/category-pictograms.module').then( m => m.PictogramsPageModule)
  },
  {
    path: 'child/:childId/category-pictograms/:categoryPictogramId/pictograms',
    loadChildren: () => import('./pictograms/pictograms/pictograms.module').then( m => m.PictogramsPageModule)
  },
  {
    path: 'child/:childId/drawings',
    loadChildren: () => import('./drawings/drawings.module').then( m => m.DrawingsPageModule)
  },
  {
    path: 'child/:childId/statistics-game',
    loadChildren: () => import('./statistics-game/statistics-game.module').then( m => m.StatisticsGamePageModule)
  },
  {
    path: 'child/:childId/update-child',
    loadChildren: () => import('./update-child/update-child.module').then( m => m.UpdateChildPageModule)
  },
  {
    path: 'update-parent',
    loadChildren: () => import('./update-parent/update-parent.module').then( m => m.UpdateParentPageModule)
  },
  {
    path: 'update-password',
    loadChildren: () => import('./update-password/update-password.module').then( m => m.UpdatePasswordPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentsSpacePageRoutingModule {}
