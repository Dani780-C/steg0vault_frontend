import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { USER_ALREADY_EXISTS_ERROR_CODE } from 'src/app/constants/constants';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthService } from '../../services/auth/auth.service';
import { AppService } from 'src/app/services/app/app.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  clicked: boolean = false;
  status: "initial" | "pressed" | "success" | "fail" = "initial";

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+(?: [a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+)*$/)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+(?: [a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+)*$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,}$/)]),
  });
  
  constructor(
    private auth: AuthService, 
    private router: Router, 
    private storageService: StorageService,
    private appService: AppService,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.clicked = false;
  }
  
  onSubmit(): void {
    if (this.registerForm.valid) {

      this.status = "pressed";
      this.auth.register(this.registerForm.value).subscribe({
        next: result => {
          this.status = "success";
          this.storageService.setToken('token', result['token'] as string);
          this.storageService.setCurrentlyLoggedUserEmail(this.email.value);
          this.appService.setExistsAnyCollection(false);
          this.userService.getUserInfo().subscribe({
            next: result => {
              localStorage.setItem('name', result.lastName + ' ' + result.firstName)
              localStorage.setItem('createdAt', result.createdAt)
              localStorage.setItem('modifiedAt', result.modifiedAt)
            },
            error: err => {
            }
          });
          
          this.router.navigate(['/home']);
        },
        error: error => {
          this.status = "fail";
          if(error.error.errorCode === USER_ALREADY_EXISTS_ERROR_CODE) {
            this.messageService.add({ severity: 'error', summary: 'Failed register:', detail: 'Email is already in use.' });
          }
        }
      });
    }
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get firstname() {
    return this.registerForm.controls['firstName'];
  }

  get lastname() {
    return this.registerForm.controls['lastName'];
  }

  validNames() {
    if((this.firstname.value?.length || 0) > 30) return false;
    if((this.lastname.value?.length || 0) > 30) return false;
    return true;
  }

  switchCheckbox() {
    this.clicked = !this.clicked;
  }

}
