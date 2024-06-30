import { NgModule } from '@angular/core';
import { ResetPasswordComponent } from './reset-password.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastModule } from 'primeng/toast';
import { MatIcon } from '@angular/material/icon';
import { MessageService } from 'primeng/api';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordComponent
  }
];

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [MessageService],
  exports: [RouterModule]
})
export class ResetPasswordModule { }
