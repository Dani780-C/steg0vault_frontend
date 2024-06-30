import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAlgorithmComponent } from './add-algorithm.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [AddAlgorithmComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ToastModule,
    MatCheckboxModule
  ]
})
export class AddAlgorithmModule { }
