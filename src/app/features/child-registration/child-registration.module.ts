import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChildRegistrationPageRoutingModule } from './child-registration-routing.module';

import { ChildRegistrationPage } from './child-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ChildRegistrationPageRoutingModule
  ],
  declarations: [ChildRegistrationPage]
})
export class ChildRegistrationPageModule {}
