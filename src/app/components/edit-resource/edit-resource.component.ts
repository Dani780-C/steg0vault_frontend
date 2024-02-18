import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExtractedResource } from 'src/app/interfaces/extracted-resource';
import { AppService } from 'src/app/services/app/app.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserAccountComponent } from '../user-account/user-account.component';

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.scss']
})
export class EditResourceComponent implements OnInit {

  algorithms: string[] = new Array('A_TYPE1', 'A_TYPE2', 'A_TYPE3', 'A_TYPE4');
  imageBytes: any;


  formGroup = this._formBuilder.group({
    fileName: [''],
    description: [''],
    algorithm: [''],
    secretToEmbed: ['']
  });


  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private appService: AppService,
    public dialogRef: MatDialogRef<UserAccountComponent>
  ) {}

  ngOnInit() {
    this.imageBytes = this.appService.getCurrentBytes();
    this.fillForm();
  }

  fillForm() {
    this.userService.getResourceInfo(
      this.appService.getCurrentExtractedResourceName(), 
      this.appService.getCurrentExtractedCollectionName()).subscribe({
        next: result => {
          this.formGroup.patchValue({'fileName': result.name});
          this.formGroup.patchValue({'description': result.description});
          this.formGroup.patchValue({'algorithm': result.algorithmType});
          console.log(result);
        },
        error: err => {
          console.log("error ");
          console.log(err);
        }
      });;
  }

  editResource() {
    
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  setAlgorithm(algorithm: string): void {
    this.formGroup.patchValue({'algorithm': algorithm});
  }

}
