import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private user: UserService,
    private messageService: MessageService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>
  ) { }

  loginForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    retypedNewPassword: new FormControl('', [Validators.required])
  });

  status: "initial" | "pressed" | "success" | "fail" = "initial";

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.status = 'pressed';
      this.user.changePassword(this.loginForm.value).subscribe({
        next: result => {
          this.status = 'success'
          this.messageService.add({ severity: 'success', summary: 'Success: :', detail: 'Your password has been changed!' });
          this.onCloseDialog();
        },
        error: error => {
          this.status = 'fail';
          this.messageService.add({ severity: 'error', summary: 'Failed:', detail: 'Something went wrong!' });
          this.onCloseDialog();
        }
      });
    }
  }
  
  onCloseDialog() {
    this.dialogRef.close();
  }

resend() {
  this.router.navigate(['forgot-password']);
}

backToLogin() {
  this.router.navigate(['login']);
}

  get newPassword() {
    return this.loginForm.controls['newPassword'];
  }

  get retypedNewPassword() {
    return this.loginForm.controls['retypedNewPassword'];
  }

  matchPass(str1: string | null, str2: string | null) {
    if(this.newPassword.value === null || this.retypedNewPassword.value === null || this.newPassword.value === '' || this.retypedNewPassword.value === '') return false;
    else if(str1 === str2) return true;
    else return false;
  }
}
