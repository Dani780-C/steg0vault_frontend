import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { UpdateCollection } from 'src/app/interfaces/update-collection';
import { AppService } from 'src/app/services/app/app.service';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { UserAccountComponent } from '../user-account/user-account.component';
import { UserService } from 'src/app/services/user/user.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  collectionName: string = '';
  resourceName: string = '';
  
  disabled: boolean = false;
  lastModifiedAt: string = '';

  // formGroup = this._formBuilder.group({
  //   firstName: [''],
  //   lastName: ['']
  // });

  formGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+(?: [a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+)*$/)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+(?: [a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]+)*$/)]),
  });

  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private storageService: StorageService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.fillForm();
  }

  fillForm() {
    this.userService.getUserInfo().subscribe({
      next: result => {
        this.formGroup.patchValue({'firstName': result.firstName});
        this.formGroup.patchValue({'lastName':  result.lastName});
        this.lastModifiedAt = result.modifiedAt;
      },
      error: err => {
      }
    });
  }

  editUser() {
    this.userService.updateUser(this.formGroup.controls['firstName'].value || '', this.formGroup.controls['lastName'].value || '').subscribe({
      next: result => {
        this.messageService.add({ severity: 'success', summary: 'Success: ', detail: 'Your user details have been updated.' });
        this.storageService.setCurrentlyLoggedUsername(result.lastName + " " + result.firstName);
        this.onCloseDialog();
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Failed: ', detail: 'Your user details have not been updated.' });
        this.onCloseDialog();
      }
    });
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  get firstname() {
    return this.formGroup.controls['firstName'];
  }

  get lastname() {
    return this.formGroup.controls['lastName'];
  }

  validNames() {
    if((this.firstname.value?.length || 0) > 30) return false;
    if((this.lastname.value?.length || 0) > 30) return false;
    return true;
  }
}
