import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { USER_NOT_FOUND_ERROR_CODE } from 'src/app/constants/constants';
import { getUser } from 'src/app/guards/auth.guard';
import { AppService } from 'src/app/services/app/app.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private auth: AuthService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const val = params['token'];
      this.loginForm.controls['token'].patchValue(val);
    });
  }

  loginForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    retypedNewPassword: new FormControl('', [Validators.required]),
    token: new FormControl('')
  });

  status: "initial" | "pressed" | "success" | "fail" = "initial";

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.status = 'pressed';
      this.auth.resetPassword(this.loginForm.value).subscribe({
        next: result => {
          this.status = 'success'
        },
        error: error => {
          this.status = 'fail';
          this.messageService.add({ severity: 'error', summary: 'Failed:', detail: 'Your reset token expired!' });
        }
      });
    }
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