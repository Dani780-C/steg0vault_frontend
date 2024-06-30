import { Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { USER_NOT_FOUND_ERROR_CODE } from 'src/app/constants/constants';
import { MessageService } from 'primeng/api';
import { AppService } from 'src/app/services/app/app.service';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { getUser } from 'src/app/guards/auth.guard';
import { UserService } from 'src/app/services/user/user.service';

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
    private messageService: MessageService,
    private appService: AppService,
    private resourceService: ResourceService,
    private userService: UserService
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
          let token = getUser(localStorage.getItem('token'))
          this.userService.getUserInfo().subscribe({
            next: result => {
              localStorage.setItem('name', result.lastName + ' ' + result.firstName)
              localStorage.setItem('createdAt', result.createdAt)
              localStorage.setItem('modifiedAt', result.modifiedAt)
            },
            error: err => {
            }
          });
          localStorage.setItem('role', token.role)
          this.storageService.setCurrentlyLoggedUserEmail(this.loginForm.controls['email'].value);
          
          if(localStorage.getItem('role') === 'USER')
            this.router.navigate(['/home']);
          else if(localStorage.getItem('role') === 'ADMIN')
            this.router.navigate(['/admin'])

          this.resourceService.getAllCollections().subscribe({
            next: result => {
              if(result.length > 0) {
                this.appService.setExistsAnyCollection(true);
              }
              else
                this.appService.setExistsAnyCollection(false);
            }
          });
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