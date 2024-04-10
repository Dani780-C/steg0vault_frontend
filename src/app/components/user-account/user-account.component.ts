import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectionStrategy } from "@angular/core";
import { UploadResourceDialogComponent } from '../upload-resource-dialog/upload-resource-dialog.component';
import { Overlay } from '@angular/cdk/overlay';
import { Resource } from 'src/app/interfaces/resource';
import { Collection } from 'src/app/interfaces/collection';
import { CollectionResources } from 'src/app/interfaces/collection-resources';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';
import { ExtractKeyComponent } from '../extract-key/extract-key.component';
import { AppService } from 'src/app/services/app/app.service';
import { EditResourceComponent } from '../edit-resource/edit-resource.component';
import { MessageService } from 'primeng/api';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { DeletePromptComponent } from '../delete-prompt/delete-prompt.component';
import { DeleteCollectionPromptComponent } from '../delete-collection-prompt/delete-collection-prompt.component';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  collectionResources: CollectionResources[] = new Array();
  resources: Resource[] = new Array();
  currentCollection: Collection = {
    name: '',
    description: ''
  };
  email: string | null = "";
  currentCollIndex: number = 0;
  existsAnyCollection: boolean = false;
  timing: boolean = false;

  numberOfSlides: number[] = new Array();
  matrix: number[][]= [];

  constructor(
    private resourceService: ResourceService,
    private appService: AppService,
    private storageService: StorageService,
    private router: Router,
    private dialog: MatDialog,
    private overlay: Overlay,
    private messageService: MessageService
    ) {
  }

  ngOnInit() {
    this.existsAnyCollection = this.appService.getExistsAnyCollection();
    if(this.existsAnyCollection === true) this.timing = true;
    this.getAllCollections();
    this.email = this.storageService.getCurrentlyLoggedUserEmail();
  }

  getCollection(collection: Collection) {
    if(collection) {
      this.resourceService.getCollectionByName(collection.name).subscribe({
        next: result => {
          this.resources = [];
          result.forEach((resource: Resource) => {
            this.resources.push(resource);
          });
          this.currentCollection.name = collection.name;
          this.currentCollection.description = collection.description;
          let ok = true;
          for(var i = 0; i < this.collectionResources.length && ok; i++) {
            if(this.collectionResources[i].collectionDTO.name === this.currentCollection.name) {
              this.currentCollIndex = i + 1;
              ok = false;
            }
          }
          this.setSlides();
          this.existsAnyCollection = true;
          this.timing = false;
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }

  getAllCollections() {
    this.resourceService.getAllCollections().subscribe({
      next: result => {
        this.collectionResources = [];
        result.forEach((collectionResource: CollectionResources) => {
          this.collectionResources.push(collectionResource);
        });
        if(this.collectionResources.length === 0) {
          this.existsAnyCollection = false;
          this.resources = [];
          this.currentCollIndex = 0;
          this.timing = true;
        }
        // else if(this.collectionResources.length > 0 && this.existsAnyCollection === false) {
        //   this.getCollection(this.collectionResources[0].collectionDTO);
        //   // this.existsAnyCollection = true;
        // }
        if(this.collectionResources.length > 0 && this.currentCollection.name === '') {
          this.getCollection(this.collectionResources[0].collectionDTO);
        }
        else if(this.existsAnyCollection == true && this.currentCollection.name !== '') {
          this.getCollection(this.currentCollection);
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }

  addResource() {
    const dialogRef = this.dialog.open(UploadResourceDialogComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCollections();
    });
  }

  editResource(collectionName: string | null, resourceName: string | null, imageBytes: any) {
    this.appService.setCurrentExtractedResourceName(resourceName);
    this.appService.setCurrentExtractedCollectionName(collectionName);
    this.appService.setCurrentBytes(imageBytes);
    this.appService.setCurrentCollectionName(collectionName || '');
    this.appService.setCurrentResourceName(resourceName || '');

    const dialogRef = this.dialog.open(EditResourceComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCollections();
      this.getCollection(this.currentCollection);
    });
  }

  extractKey(collectionName: string | null, resourceName: string | null, imageBytes: any) {
    this.appService.setCurrentExtractedResourceName(resourceName);
    this.appService.setCurrentExtractedCollectionName(collectionName);
    this.appService.setCurrentBytes(imageBytes);

    const dialogRef = this.dialog.open(ExtractKeyComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  selectCollectionToDisplay(collectionResource: CollectionResources): void {
    if(collectionResource.collectionDTO.name !== this.currentCollection.name) {
      this.getCollection(collectionResource.collectionDTO);
    }
  }

  deleteResource(collName: string, resName: string) {
    let ok = false;
    if(this.resources.length == 1) {
      this.appService.setDeleteCollection(true);
      ok = true;
    }
    else {
      this.appService.setDeleteCollection(false);
    }
    this.appService.setCurrentCollectionName(collName);
    this.appService.setCurrentResourceName(resName);
    const dialogRef = this.dialog.open(DeletePromptComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
      if(ok === true && this.appService.getDeleted() === true) 
        this.currentCollection.name = '';
      this.getAllCollections();
      // if(ok === true && this.collectionResources.length > 0) {
      //   this.currentCollection = this.collectionResources[0].collectionDTO;
      //   this.getCollection(this.currentCollection);
      //   this.existsAnyCollection = true;
      // }
      // else {
      //   this.existsAnyCollection = false;
      // } 
    });
  }

  deleteCollection(collName: string) {
    
    this.appService.setCurrentCollectionName(collName);
    this.appService.setResLength(this.resources.length);
    const dialogRef = this.dialog.open(DeleteCollectionPromptComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
      if(this.appService.getCollDeleted() === true)
        this.currentCollection.name = '';
      this.getAllCollections();
      // if(ok === true && this.collectionResources.length > 0) {
      //   this.currentCollection = this.collectionResources[0].collectionDTO;
      //   this.getCollection(this.currentCollection);
      //   this.existsAnyCollection = true;
      // }
      // else {
      //   this.existsAnyCollection = false;
      // } 
    });
  }

  // editCollection() {
    
  // }

  saveResource(collectionName: string, resourceName: string) {
    this.resourceService.saveResource(collectionName, resourceName).subscribe({
      next: result => {
        this.getCollection(this.currentCollection);
        console.log(result);
        if(result === true)
          this.messageService.add({ severity: 'success', summary: 'Saved!', detail: 'Added to favourites!' });
        else
          this.messageService.add({ severity: 'success', summary: 'Unsaved!', detail: 'Removed from favourites!' });
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Error: ', detail: 'Something went wrong!' });
      }
    });
  }

  logout(): void {
    this.storageService.removeToken();
    this.storageService.removeEmail();
    this.router.navigate(['/login']);
  }

  setSlides() {
    let n = this.resources.length;
    while(n % 3) {
      n++;
    }
    this.matrix = [];
    this.numberOfSlides = [];
    for(let i = 1; i < n / 3; i++) {
      this.numberOfSlides.push(i);
    }
    for(let i = 0; i < n; i += 3) {
      let arr: number[] = new Array();
      for(let j = i; j < i + 3 && j < this.resources.length; j++) {
        arr.push(j);
      }
      this.matrix.push(arr);
    }
  }

}