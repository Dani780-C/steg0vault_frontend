import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EditResourceComponent } from './edit-resource.component';
import { MatIconModule } from '@angular/material/icon';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    EditResourceComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ToastModule
  ]
})
export class EditResourceModule { }
