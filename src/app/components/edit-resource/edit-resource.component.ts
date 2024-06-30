import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UpdateResource } from 'src/app/interfaces/updateResource';
import { AppService } from 'src/app/services/app/app.service';
import { UserAccountComponent } from '../user-account/user-account.component';
import { MessageService } from 'primeng/api';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { CollectionResources } from 'src/app/interfaces/collection-resources';

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
    'newCollection': '',
    'description': '',
    'name': '',
    'newSecret': ''
  };
  disabled: boolean = false;

  formGroup = this._formBuilder.group({
    fileName: [''],
    description: [''],
    newCollection: [''],
    secretToEmbed: ['']
  });
  collectionResources: CollectionResources[] = new Array();
  currentCollection:string = '';
  disabledCancel: boolean = false;

  currentName: string = '';
  currentColl: string = '';

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
    this.getAllCollections();
    this.currentCollection = this.appService.getCurrentCollectionName();
    this.currentName = this.appService.getCurrentResourceName();
  }

  fillForm() {
    this.resourceService.getResourceInfo(
      this.appService.getCurrentExtractedResourceName(), 
      this.appService.getCurrentExtractedCollectionName()).subscribe({
        next: result => {
          this.formGroup.patchValue({'fileName': result.name});
          this.formGroup.patchValue({'description': result.description});
          this.formGroup.patchValue({'newCollection': this.appService.getCurrentCollectionName()});
          this.currentName = result.name;
          this.currentColl = this.appService.getCurrentCollectionName();
        },
        error: err => {
        }
      });;
  }

  getAllCollections() {
    this.resourceService.getAllCollections().subscribe({
      next: result => {
        this.collectionResources = [];
        result.forEach((collectionResource: CollectionResources) => {
          this.collectionResources.push(collectionResource);
        });
      },
      error: err => {
      }
    });
  }

  editResource() {
    this.disabled = true;
    this.disabledCancel = true;
    this.updateResource.newCollection = this.formGroup.controls['newCollection'].value?.trim() || '';
    this.updateResource.name = this.formGroup.controls['fileName'].value?.trim() || '';
    this.updateResource.newSecret = this.formGroup.controls['secretToEmbed'].value;
    this.updateResource.description = this.formGroup.controls['description'].value?.trim() || '';
    this.resourceService.updateResource(
        this.appService.getCurrentCollectionName(),
        this.appService.getCurrentResourceName(),
        this.updateResource
      ).subscribe({
        next: result => {
          this.messageService.add({ severity: 'success', summary: 'Success: ', detail: 'The resource has been updated.' });
          this.disabled = false;
          this.onCloseDialog();
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Failed: ', detail: 'The resource has not been updated. The new secret is too long to be embedded!' });
          this.onCloseDialog();
        }
      });;
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  setNewCollection(coll: string): void {
    this.formGroup.patchValue({'newCollection': coll});
  }

  getNewCollection() {
    return this.formGroup.controls['newCollection'].value?.trim();
  }

  getName() {
    return this.formGroup.controls['fileName'].value?.trim();
  }

  getDescription() {
    return this.formGroup.controls['description'].value?.trim();
  }

  validNames() {
    if((this.getName()?.length || 0) > 100) return false;
    if((this.getDescription()?.length || 0) > 255) return false;
    return true;
  }

  valid() {

    if(this.getName() === '') return false;
    if(this.currentCollection !== this.getNewCollection()) {
      for(let i = 0; i < this.collectionResources.length; i++) {
        if(this.collectionResources[i].collectionDTO.name === this.getNewCollection()) {
          for(let j = 0; j < this.collectionResources[i].resourceNameAndDescriptionDTO.length; j++) {
            if(this.collectionResources[i].resourceNameAndDescriptionDTO[j].name === this.getName()) {
              return false;
            }
          }
        }
      }
    }
    else {
      for(let i = 0; i < this.collectionResources.length; i++) {
        if(this.collectionResources[i].collectionDTO.name === this.getNewCollection()) {
          for(let j = 0; j < this.collectionResources[i].resourceNameAndDescriptionDTO.length; j++) {
            if(this.collectionResources[i].resourceNameAndDescriptionDTO[j].name === this.getName() && this.getName() !== this.currentName) {
              return false;
            }
          }
        }
      }
    }
    return true;
  }

}
