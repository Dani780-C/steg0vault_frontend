import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { USER_ALREADY_EXISTS_ERROR_CODE } from 'src/app/constants/constants';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AddAdminComponent } from '../add-admin/add-admin.component';

@Component({
  selector: 'app-add-algorithm',
  templateUrl: './add-algorithm.component.html',
  styleUrls: ['./add-algorithm.component.scss']
})
export class AddAlgorithmComponent {
  status: "initial" | "pressed" | "success" | "fail" = "initial";
  ELEMENT_DATA_ALGORITHM: Algorithm[] = [];

  registerForm = new FormGroup({
    algorithmName: new FormControl('', [Validators.required])
  });
  
  constructor(
    private admin: AdminService,
    private messageService: MessageService,
    public dialogRef: MatDialogRef<AddAdminComponent>,
  ) {}

  ngOnInit(): void {
    this.getAllAlgs();
  }

  getAllAlgs() {
    this.admin.getAllAlgs().subscribe({
      next: result => {
        this.ELEMENT_DATA_ALGORITHM = [];
        result.forEach((alg: Algorithm) => {
          this.ELEMENT_DATA_ALGORITHM.push(alg);
        });
      },
      error: err => {
      }
    });
  }
  
  onSubmit(): void {
    if (this.registerForm.valid) {

      this.status = "pressed";
      this.admin.createAlgorithm(this.registerForm.value).subscribe({
        next: result => {
          this.status = "success";
          this.messageService.add({ severity: 'success', summary: 'Success:', detail: 'New algorithm was created.' });
          this.onCloseDialog();
        },
        error: error => {
          this.status = "fail";
          if(error.error.errorCode === USER_ALREADY_EXISTS_ERROR_CODE) {
            this.messageService.add({ severity: 'error', summary: 'Failed:', detail: 'Something went wrong.' });
          }
        }
      });
    }
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  get algorithmName() {
    return this.registerForm.controls['algorithmName'];
  }

  existsAlready() {
    for(let i = 0; i < this.ELEMENT_DATA_ALGORITHM.length; i++)
      if(this.ELEMENT_DATA_ALGORITHM[i].name === this.algorithmName.value?.trim())
        return true;

    return false;
  }

  validName() {
    if((this.algorithmName.value?.length || 0) > 100) return false;
    return true;
  }

}
