import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectionStrategy } from "@angular/core";
import { UploadResourceDialogComponent } from '../upload-resource-dialog/upload-resource-dialog.component';
import { Overlay } from '@angular/cdk/overlay';
import { UserService } from 'src/app/services/user/user.service';
import { Resource } from 'src/app/interfaces/resource';
import { Collection } from 'src/app/interfaces/collection';
import { CollectionResources } from 'src/app/interfaces/collection-resources';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';
import { ExtractKeyComponent } from '../extract-key/extract-key.component';
import { AppService } from 'src/app/services/app/app.service';
import { EditResourceComponent } from '../edit-resource/edit-resource.component';

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

  numberOfSlides: number[] = new Array();
  matrix: number[][]= [];

  constructor(
    private userService: UserService,
    private appService: AppService,
    private storageService: StorageService,
    private router: Router,
    private dialog: MatDialog,
    private overlay: Overlay) {
  }

  ngOnInit() {
    this.getAllCollections();
  }

  getCollection(collection: Collection) {
    if(collection) {
      this.userService.getCollectionByName(collection.name).subscribe({
        next: result => {
          this.resources = [];
          result.forEach((resource: Resource) => {
            this.resources.push(resource);
          });
          this.currentCollection.name = collection.name;
          this.currentCollection.description = collection.description;
          // console.log("Resources: ");
          // console.log(this.resources);
          // console.log("Current collection: ");
          // console.log(this.currentCollection);
          this.setSlides();
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }

  getAllCollections() {
    this.userService.getAllCollections().subscribe({
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
        // console.log("Collections: ");
        // console.log(this.collectionResources);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  addResource() {
    const dialogRef = this.dialog.open(UploadResourceDialogComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.getAllCollections();
      // this.getCollection(this.currentCollection);
    });
  }

  editResource(collectionName: string | null, resourceName: string | null, imageBytes: any) {
    this.appService.setCurrentExtractedResourceName(resourceName);
    this.appService.setCurrentExtractedCollectionName(collectionName);
    this.appService.setCurrentBytes(imageBytes);

    const dialogRef = this.dialog.open(EditResourceComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.getAllCollections();
      // this.getCollection(this.currentCollection);
    });
  }

  extractKey(collectionName: string | null, resourceName: string | null, imageBytes: any) {
    this.appService.setCurrentExtractedResourceName(resourceName);
    this.appService.setCurrentExtractedCollectionName(collectionName);
    this.appService.setCurrentBytes(imageBytes);

    const dialogRef = this.dialog.open(ExtractKeyComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      // this.getAllCollections();
      // this.getCollection(this.currentCollection);
    });
  }

  selectCollectionToDisplay(collectionResource: CollectionResources): void {
    if(collectionResource.collectionDTO.name !== this.currentCollection.name) {
      this.getCollection(collectionResource.collectionDTO);
    }
  }

  logout(): void {
    this.storageService.removeToken();
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
    // console.log(this.matrix);
  }

}

// myControl = new FormControl('');
// options: string[] = ['One', 'Two', 'Three'];
// filteredOptions!: Observable<string[]>;

// private _filter(value: string): string[] {
//   const filterValue = value.toLowerCase();

//   return this.options.filter(option => option.toLowerCase().includes(filterValue));
// }

// // in ngOnInit

// this.filteredOptions = this.myControl.valueChanges.pipe(
//   startWith(''),
//   map(value => this._filter(value || '')),
// );
