import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UpdateResource } from 'src/app/interfaces/updateResource';
import { AppService } from 'src/app/services/app/app.service';
import { UserAccountComponent } from '../user-account/user-account.component';
import { MessageService } from 'primeng/api';
import { ResourceService } from 'src/app/services/resource/resource.service';

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.scss']
})
export class EditResourceComponent implements OnInit {

  algorithms: string[] = new Array('LSB_REPLACEMENT', 'LSB_MATCHING', 'LSB_MATCHING_REVISITED', 'BINARY_HAMMING_CODES', 'RANDOM_PIXEL_SELECTION', 'MULTI_BIT_PLANE');
  imageBytes: any;
  collectionName: string = '';
  resourceName: string = '';
  updateResource: UpdateResource = {
    'algorithm': '',
    'description': '',
    'name': '',
    'newSecret': ''
  };

  formGroup = this._formBuilder.group({
    fileName: [''],
    description: [''],
    algorithm: [''],
    secretToEmbed: ['']
  });


  constructor(
    private _formBuilder: FormBuilder,
    private resourceService: ResourceService,
    private appService: AppService,
    public dialogRef: MatDialogRef<UserAccountComponent>,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.imageBytes = this.appService.getCurrentBytes();
    this.fillForm();
  }

  fillForm() {
    this.resourceService.getResourceInfo(
      this.appService.getCurrentExtractedResourceName(), 
      this.appService.getCurrentExtractedCollectionName()).subscribe({
        next: result => {
          console.log(result);
          this.formGroup.patchValue({'fileName': result.name});
          this.formGroup.patchValue({'description': result.description});
          this.formGroup.patchValue({'algorithm': result.algorithm});
          // console.log(result);
        },
        error: err => {
          // console.log("error ");
          // console.log(err);
        }
      });;
  }

  editResource() {
    this.updateResource.algorithm = this.formGroup.controls['algorithm'].value;
    this.updateResource.name = this.formGroup.controls['fileName'].value;
    this.updateResource.newSecret = this.formGroup.controls['secretToEmbed'].value;
    this.updateResource.description = this.formGroup.controls['description'].value;
    this.resourceService.updateResource(
        this.appService.getCurrentCollectionName(),
        this.appService.getCurrentResourceName(),
        this.updateResource
      ).subscribe({
        next: result => {
          this.messageService.add({ severity: 'success', summary: 'Success: ', detail: 'The resource has been updated.' });
          this.onCloseDialog();
          // console.log(result);
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Failed: ', detail: 'The resource has not been updated.' });
          // console.log("error ");
          // console.log(err);
        }
      });;
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  setAlgorithm(algorithm: string): void {
    this.formGroup.patchValue({'algorithm': algorithm});
  }

}
