import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { USER_ALREADY_EXISTS_ERROR_CODE } from 'src/app/constants/constants';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent {
  status: "initial" | "pressed" | "success" | "fail" = "initial";

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+(?: [a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+)*$/)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+(?: [a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+)*$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,}$/)]),
  });
  
  constructor(
    private admin: AdminService,
    private messageService: MessageService,
    public dialogRef: MatDialogRef<AddAdminComponent>,
  ) {}

  ngOnInit(): void {}
  
  onSubmit(): void {
    if (this.registerForm.valid) {

      this.status = "pressed";
      this.admin.createAdmin(this.registerForm.value).subscribe({
        next: result => {
          this.status = "success";
          this.messageService.add({ severity: 'success', summary: 'Success:', detail: 'New admin was created.' });
          this.onCloseDialog();
        },
        error: error => {
          this.status = "fail";
          if(error.error.errorCode === USER_ALREADY_EXISTS_ERROR_CODE) {
            this.messageService.add({ severity: 'error', summary: 'Failed:', detail: 'Email is already in use.' });
          }
        }
      });
    }
  }

  onCloseDialog() {
    this.dialogRef.close();
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
}
