import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteCollectionPromptComponent } from './delete-collection-prompt.component';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    DeleteCollectionPromptComponent
  ],
  imports: [
    CommonModule,
    ToastModule
  ]
})
export class DeleteCollectionPromptModule { }
