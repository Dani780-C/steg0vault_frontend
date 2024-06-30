import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteAccountComponent } from './delete-account.component';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [DeleteAccountComponent],
  imports: [
    CommonModule,
    ToastModule
  ]
})
export class DeleteAccountModule { }
