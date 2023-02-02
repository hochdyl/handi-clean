import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildRegistrationPage } from './child-registration.page';

const routes: Routes = [
  {
    path: '',
    component: ChildRegistrationPage
  },
  {
    path: ':id/abilities',
    loadChildren: () => import('./abilities/abilities.module').then( m => m.AbilitiesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildRegistrationPageRoutingModule {}
