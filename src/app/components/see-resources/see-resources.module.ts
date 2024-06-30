import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeeResourcesComponent } from './see-resources.component';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [SeeResourcesComponent],
  imports: [
    CommonModule,
    MatPaginatorModule
  ]
})
export class SeeResourcesModule { }
