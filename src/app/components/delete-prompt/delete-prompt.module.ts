import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeletePromptComponent } from './delete-prompt.component';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    DeletePromptComponent
  ],
  imports: [
    CommonModule,
    ToastModule
  ]
})
export class DeletePromptModule { 
}
