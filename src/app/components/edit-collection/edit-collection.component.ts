import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UpdateCollection } from 'src/app/interfaces/update-collection';
import { AppService } from 'src/app/services/app/app.service';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { UserAccountComponent } from '../user-account/user-account.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { CollectionResources } from 'src/app/interfaces/collection-resources';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.scss']
})
export class EditCollectionComponent {

  collectionName: string = '';
  resourceName: string = '';
  updateCollection: UpdateCollection = { 
    'name': '',
    'description': ''
  };
  disabled: boolean = false;
  collectionResources: CollectionResources[] = new Array();
  currentCollection:string = '';

  formGroup = this._formBuilder.group({
    name: [''],
    description: ['']
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
    this.fillForm();
    this.getAllCollections();
    this.currentCollection = this.appService.getCurrentCollectionName();
  }

  fillForm() {
    this.formGroup.patchValue({'name': this.appService.getCurrentCollectionName()});
    this.formGroup.patchValue({'description': this.appService.getCurrentCollectionDescription()});
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

  editCollection() {
    this.disabled = true;
    this.updateCollection.name = this.formGroup.controls['name'].value?.trim() || '';
    this.updateCollection.description = this.formGroup.controls['description'].value?.trim() || '';
    this.resourceService.updateCollection(
        this.appService.getCurrentCollectionName(),
        this.updateCollection
      ).subscribe({
        next: result => {
          this.messageService.add({ severity: 'success', summary: 'Success: ', detail: 'The collection has been updated.' });
          this.disabled = false;
          this.onCloseDialog();
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Failed: ', detail: 'The collection has not been updated.' });
          this.onCloseDialog();
        }
      });;
  }

  getName() {
    return this.formGroup.controls['name'].value;
  }

  getDescription() {
    return this.formGroup.controls['description'].value;
  }

  validNames() {
    if((this.getDescription()?.length || 0) > 255) return false;
    if((this.getName()?.length || 0) > 100) return false;
    return true;
  }

  valid() {
    if(this.getName() === '') return false;
    for(let i = 0; i < this.collectionResources.length; i++) {
      if(this.collectionResources[i].collectionDTO.name === this.getName() && this.getName() !== this.currentCollection)
        return false;
    }
    return true;
  }

  onCloseDialog() {
    this.dialogRef.close();
  }
}
