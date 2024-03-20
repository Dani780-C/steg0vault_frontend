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
          this.setSlides();
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
        if(this.collectionResources.length > 0 && this.currentCollection.name === '') {
          this.getCollection(this.collectionResources[0].collectionDTO);
        }
        else if(this.currentCollection.name !== '') {
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

    const dialogRef = this.dialog.open(EditResourceComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCollections();
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

  deleteResource() {

  }

  deleteCollection() {

  }

  editCollection() {
    
  }

  saveResource() {
    this.resourceService.saveResource().subscribe({
      next: result => {
        this.messageService.add({ severity: 'success', summary: 'Saved!', detail: 'Added to the favourites!' });
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