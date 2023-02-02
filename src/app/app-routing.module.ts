import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { HomeGuardService } from './core/guards/home-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/slides/tab1/tab1.module').then( m => m.Tab1PageModule),
    canLoad: [HomeGuardService]
  },
  {
    path: 'tab1',
    loadChildren: () => import('./features/home/slides/tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./features/home/slides/tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./features/home/slides/tab3/tab3.module').then( m => m.Tab3PageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./features/home/slides/tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'connexion',
    loadChildren: () => import('./features/connexion/connexion.module').then( m => m.ConnexionPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./features/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'children-space/:id',
    loadChildren: () => import('./features/children-space/children-space.module').then( m => m.ChildrenSpacePageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'parents-space/:id',
    loadChildren: () => import('./features/parents-space/parents-space.module').then( m => m.ParentsSpacePageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'child-registration',
    loadChildren: () => import('./features/child-registration/child-registration.module').then( m => m.ChildRegistrationPageModule),
    canLoad: [AuthGuardService]
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
