import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildrenSpacePage } from './children-space.page';

const routes: Routes = [
  {
    path: '',
    component: ChildrenSpacePage,
  },
  {
    path: 'games/:gameId/piano-memory',
    loadChildren: () => import('./games/memory/piano-memory/piano-memory.module').then( m => m.PianoMemoryPageModule)
  },
  {
    path: 'games/:gameId/complete-word',
    loadChildren: () => import('./games/school/complete-word/complete-word.module').then( m => m.CompleteWordPageModule)
  },
  {
    path: 'games/:gameId/drawing',
    loadChildren: () => import('./games/drawing/drawing.module').then( m => m.DrawingPageModule)
  },
  {
    path: 'characters',
    loadChildren: () => import('./characters/characters.module').then( m => m.CharactersPageModule)
  },
  {
    path: 'pictograms',
    loadChildren: () => import('./pictograms/pictograms.module').then( m => m.PictogramsPageModule)
  },
  {
    path: 'games/:gameId/images-identification',
    loadChildren: () =>
    import('./games/identification/images-identification/images-identification.module').then( m => m.ImagesIdentificationPageModule)
  },
  {
    path: 'games/:gameId/animations',
    loadChildren: () => import('./games/animations/animations.module').then( m => m.AnimationsPageModule)
  },
  {
    path: 'games/:gameId/animals',
    loadChildren: () => import('./games/animals/animals.module').then( m => m.AnimalsPageModule)
  },
  {
    path: 'games/:gameId/balloon',
    loadChildren: () => import('./games/balloon/balloon.module').then( m => m.BalloonPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildrenSpacePageRoutingModule {}
