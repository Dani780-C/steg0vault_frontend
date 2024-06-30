import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkInactiveComponent } from './mark-inactive.component';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [MarkInactiveComponent],
  imports: [
    CommonModule,
    MatCheckboxModule
  ]
})
export class MarkInactiveModule { }
