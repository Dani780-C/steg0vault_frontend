import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { LoginComponent } from "./login.component";
import { ToastModule } from 'primeng/toast';
import { MessageService } from "primeng/api";
import { CommonModule } from "@angular/common";

const routes: Routes = [
    {
      path: '',
      component: LoginComponent
    }
];

@NgModule({
    declarations: [
      LoginComponent
    ],
    imports: [
      RouterModule.forChild(routes),
      CommonModule,
      FormsModule,
      FontAwesomeModule,
      ReactiveFormsModule,
      ToastModule
    ],
    providers: [MessageService],
    exports: [RouterModule]
})
export class LoginModule { }