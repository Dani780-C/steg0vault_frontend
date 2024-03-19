import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { USER_NOT_FOUND_ERROR_CODE } from 'src/app/constants/constants';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  status: "initial" | "pressed" | "success" | "fail" = "initial";


  constructor(
    private auth: AuthService, 
    private router: Router, 
    private storageService: StorageService,
    private messageService: MessageService  
  ) {
  }

  ngOnInit(): void {
    if(this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.status = 'pressed';
      this.auth.login(this.loginForm.value).subscribe({
        next: result => {
          this.status = 'success';
          this.storageService.setToken('token', result['token'] as string);
          this.storageService.setCurrentlyLoggedUserEmail(this.loginForm.controls['email'].value);
          this.router.navigate(['/home']);
        },
        error: error => {
          this.status = 'fail';
          if(error.error.errorCode === USER_NOT_FOUND_ERROR_CODE) {
            this.messageService.add({ severity: 'error', summary: 'Failed login:', detail: 'Incorrect email or password' });
          }
        }
      });
    }
  }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }
}