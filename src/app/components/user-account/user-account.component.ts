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
import { ResourceNameAndDescription } from 'src/app/interfaces/resource-name-and-description';
import { TryToExtractComponent } from '../try-to-extract/try-to-extract.component';
import { EditCollectionComponent } from '../edit-collection/edit-collection.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';
import { SeeMoreComponent } from '../see-more/see-more.component';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  collectionResources: CollectionResources[] = new Array();
  resources: Resource[] = new Array();
  currentCollection: Collection = {
    name: '',
    description: '',
    createdAt: '',
    modifiedAt: ''
  };

  oldCollection: string = '';
  newCollection: string = '';
  oldNumber: number = 0;

  updated: boolean = false;
  email: string | null = "";
  currentCollIndex: number = 0;
  existsAnyCollection: boolean = false;
  timing: boolean = false;
  fullName: string = '';
  ready: boolean = false;
  refreshed: boolean = false;
  bigI: number = 0;

  FIRST: boolean = true;

  numberOfSlides: number[] = new Array();
  matrix: number[][] = [];

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
    if(this.FIRST === true) {
      this.existsAnyCollection = this.appService.getExistsAnyCollection();
      if(this.existsAnyCollection === true) this.timing = true;
      this.fullName = '';
      this.getAllCollections();
      this.email = this.storageService.getCurrentlyLoggedUserEmail();
      this.refreshed = false;
      this.FIRST = false;
    }
  }

  getUserInfo() {
    this.fullName = localStorage.getItem('name') || '';
  }

  getCollection(collection: Collection) {
    if(collection) {
      this.resourceService.getCollectionByName(collection.name).subscribe({
        next: result => {
          let copy = this.resources;
          this.resources = [];
          result.forEach((resource: Resource) => {
            for(let i = 0; i < copy.length; i++)
              if(copy[i].id === resource.id)
                resource.imageBytes = copy[i].imageBytes;
            this.resources.push(resource);
          });
          this.currentCollection.name = collection.name;
          this.currentCollection.description = collection.description;
          this.currentCollection.createdAt = collection.createdAt;
          this.currentCollection.modifiedAt = collection.modifiedAt;
          let ok = true;
          for(var i = 0; i < this.collectionResources.length && ok; i++) {
            if(this.collectionResources[i].collectionDTO.name === this.currentCollection.name) {
              this.currentCollIndex = i + 1;
              ok = false;
            }
          }
          this.refreshed = false;
          this.setSlides();

          this.existsAnyCollection = true;
          this.timing = false;
          this.ready = true;
          this.getImages();
        },
        error: err => {
        }
      });
    }
  }

  seeMore(str: string | null) {

    this.appService.setSeeMoreStr(str || '');
    const dialogRef = this.dialog.open(SeeMoreComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
      //this.getAllCollections();
    });
  }
    
  getAllCollections() {
    this.resourceService.getAllCollections().subscribe({
      next: result => {
        this.collectionResources = [];
        let ok = false;
        result.forEach((collectionResource: CollectionResources) => {

          if(collectionResource.collectionDTO.name === this.currentCollection.name)
            ok = true;

          this.collectionResources.push(collectionResource);
        });
        if(ok === false && this.updated === false) {
          this.currentCollection.name = ''
          this.currentCollIndex = 0
        }
        if(this.collectionResources.length === 0) {
          this.existsAnyCollection = false;
          this.resources = [];
          this.currentCollIndex = 0;
          this.timing = true;
        }

        if(this.collectionResources.length > 0 && this.currentCollection.name === '') {
          this.getCollection(this.collectionResources[0].collectionDTO);
          this.updated = false;
        }
        else if(this.existsAnyCollection === true && this.currentCollection.name !== '') {
          this.getCollection(this.collectionResources[this.currentCollIndex - 1].collectionDTO);
        }
        this.getUserInfo();
        this.updated = false
      },
      error: err => {
      }
    });
  }

  addResource() {
    const dialogRef = this.dialog.open(UploadResourceDialogComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCollections();
    });
  }

  tryExtraction() {
    const dialogRef = this.dialog.open(TryToExtractComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
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
      this.existsAnyCollection = true;
      this.getAllCollections();
    });
  }

  getImages() {
    for(let i = 0; i < this.resources.length; i++)
      if(this.resources[i].imageBytes === '')
        this.getImage(this.currentCollection.name, this.resources[i].name, i);
  }

  getImage(collName: string | null, resName: string | null, index: number) {
    if(this.resources[index].imageBytes === '' && this.ready === true) {
      this.resourceService.getImage(collName || '', resName || '').subscribe({
        next: result => {
          this.resources[index].imageBytes = result.imageBytes
        },
        error: err => {
        }
      });
    }
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
    });
  }

  updateCollection(collName: string, collDescr: string) {
    
    this.appService.setCurrentCollectionName(collName);
    this.appService.setCurrentCollectionDescription(collDescr);
    const dialogRef = this.dialog.open(EditCollectionComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
      this.updated = true;
      this.getAllCollections();
    });
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  editUser() {
    const dialogRef = this.dialog.open(EditUserComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
      this.fullName = this.storageService.getCurrentlyLoggedUsername() || '';
    });
  }

  saveResource(collectionName: string, resourceName: string) {
    this.resourceService.saveResource(collectionName, resourceName).subscribe({
      next: result => {
        this.getCollection(this.currentCollection);
        if(result === true) {
          this.messageService.add({ severity: 'success', summary: 'Saved!', detail: 'Added to favourites!' });
        }
        else
          this.messageService.add({ severity: 'success', summary: 'Unsaved!', detail: 'Removed from favourites!' });
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Error: ', detail: 'Something went wrong!' });
      }
    });
  }

  downloadImage(imageBytes: any, imageName: string, type: string) {
    const withoutHeader = imageBytes.replace(`data:${type.toLowerCase()};base64,`, '')
    const src = `data:${type};base64,${withoutHeader}`;
    const link = document.createElement("a")
    link.href = src
    link.download = imageName
    link.click()
    link.remove()
  }

  logout(): void {
    this.storageService.removeToken();
    this.storageService.removeEmail();
    this.router.navigate(['/login']);
  }

  deleteAccount() {
    const dialogRef = this.dialog.open(DeleteAccountComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
    });
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

    if(this.oldCollection !== this.currentCollection.name || 
      (this.oldNumber > this.resources.length && this.resources.length % 3 === 0)) {
        
        /////////////////////////////////////////////////////////////
        const carousel = document.querySelectorAll(".carousel-item")
        carousel.forEach(element => {
          element.setAttribute("class", "carousel-item")
        });
        const principal = document.getElementById("principal")?.setAttribute("class", "carousel-item active")
        //////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////
        const indicators = document.querySelectorAll("#indicator")
        indicators.forEach(element => {
          element.setAttribute("class", "ng-star-inserted")
        });
        const act = document.getElementById("active")?.setAttribute("class", "active")
        // const principal = document.getElementById("principal")?.setAttribute("class", "carousel-item active")
        //////////////////////////////////////////////////////
      }

    this.oldCollection = this.currentCollection.name || ''
    this.oldNumber = this.resources.length

    this.refreshed = true;
    this.bigI = 0;
  }

  left() {
    if(this.bigI === 0)
      this.bigI = this.numberOfSlides.length;
    else
      this.bigI--;
  }

  right() {
    if(this.bigI === this.numberOfSlides.length)
      this.bigI = 0;
    else
      this.bigI++;
  } 


}