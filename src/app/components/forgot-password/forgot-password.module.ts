import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent
  }
];
@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ForgotPasswordModule { }