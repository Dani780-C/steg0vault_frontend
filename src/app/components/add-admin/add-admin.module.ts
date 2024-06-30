import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAdminComponent } from './add-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [AddAdminComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ToastModule,
    MatCheckboxModule
  ]
})
export class AddAdminModule { }
