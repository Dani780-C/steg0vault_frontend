import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { throwError} from 'rxjs';
import { FILE_TYPES } from 'src/app/constants/constants';
import { CollectionResources } from 'src/app/interfaces/collection-resources';
import { PostResource } from 'src/app/interfaces/post-resource'
import { UserAccountComponent } from '../user-account/user-account.component';
import { ResourceService } from 'src/app/services/resource/resource.service';

@Component({
  selector: 'app-upload-resource-dialog',
  templateUrl: './upload-resource-dialog.component.html',
  styleUrls: ['./upload-resource-dialog.component.scss']
})
export class UploadResourceDialogComponent implements OnInit {
  
  collectionResources: CollectionResources[] = new Array();
  algorithms: string[] = new Array();
  status: "initial" | "uploading" | "success" | "fail" = "initial";
  file: File | null = null;
  myimage: string = '';
  createCollectionBoolean: boolean = false;

  firstFormGroup = this._formBuilder.group({
    fileName: ['', Validators.required]
  });
  
  secondFormGroup = this._formBuilder.group({
    fileName: ['', Validators.required],
    fileDescription: [''],
    collection: ['', Validators.required],
    collectionDescription: [''],
    algorithm: ['', Validators.required],
    secretToEmbed: ['', Validators.required]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private resourceService: ResourceService,
    public dialogRef: MatDialogRef<UserAccountComponent>
  ) {}

  validateCollection(): boolean {
    if(this.collectionResources) {
      for(let i = 0; i < this.collectionResources.length; i++) {
        if(this.collectionResources[i].collectionDTO.name === this.collection.value) {
          return true;
        }
      }
      return false;
    }
    return false;
  }

  validateFilename(): boolean {
    
    for(let i=0 ;i<this.collectionResources.length;i++){
      if(this.collectionResources[i].collectionDTO.name?.trim()===this.collection.value?.trim()){
        for(let j=0 ;j<this.collectionResources[i].resourceNameAndDescriptionDTO.length;j++){
          if(this.collectionResources[i].resourceNameAndDescriptionDTO[j].name.trim() === this.fileName.value?.trim()){
            return true;
          }
        }
      }
    }
    return false;
  }

  ngOnInit(): void {
    this.getAllCollections();
    this.getAllAlgorithms();
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

  getAllAlgorithms() {
    this.resourceService.getAllAlgorithms().subscribe({
      next: result => {
        result.forEach((alg: string) => {
          this.algorithms.push(alg);
        });
      },
      error: err => {
      }
    });
  }

  onChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.status = "initial";
      this.file = file;
      if(!this.acceptableFileType()) {
        this.convertToBase64(this.file);
        this.firstFormGroup.patchValue({'fileName': file.name});    
      }
      else {
        this.firstFormGroup.patchValue({'fileName': ''});
      }
    }
  }

  onUpload() {
    if (this.file) {
      const postResource : PostResource = {
        resourceDTO: {
          id: 0,
          name: (this.fileName.value !== null) ? this.fileName.value.trim() : null,
          type: this.file.type,
          description: this.fileDescription.value?.trim() || '',
          algorithm: this.algorithm.value,
          saved: false,
          imageBytes: this.myimage,
          createdAt: '',
          modifiedAt: ''
        },
        collectionDTO: {
          name: (this.collection.value !== null) ? this.collection.value.trim() : null,
          description: this.collectionDescription.value?.trim() || '',
          createdAt: '',
          modifiedAt: ''
        },
        secretToEmbed: this.secretToEmbed.value,
      };

      this.status = "uploading";

      this.resourceService.postResource(postResource).subscribe({
        next: () => {
          this.status = "success";
        },
        error: (error: any) => {
          this.status = "fail";
          return throwError(() => error);
        },
      });
    }
  }

  reset(): void {
    this.file = null;
    this.firstFormGroup.patchValue({'fileName': ''});
    this.secondFormGroup.patchValue(
      {
        'fileName': '',
        'fileDescription': '',
        'algorithm': '',
        'collection': '',
        'collectionDescription': '',
        'secretToEmbed': ''
      }
    );
    this.status = 'initial';
    this.getAllCollections();
  }

  setCollection(collection: string | null): void {
    this.secondFormGroup.patchValue({'collection': collection});
    this.createCollectionBoolean = false;
  }

  setAlgorithm(algorithm: string): void {
    this.secondFormGroup.patchValue({'algorithm': algorithm});
  }

  createCollection(): void {
    this.createCollectionBoolean = true;
  }

  get collection() {
    return this.secondFormGroup.controls['collection'];
  }

  get collectionDescription() {
    return this.secondFormGroup.controls['collectionDescription'];
  }

  get algorithm() {
    return this.secondFormGroup.controls['algorithm'];
  }

  get fileName() {
    return this.secondFormGroup.controls['fileName'];
  }

  get fileDescription() {
    return this.secondFormGroup.controls['fileDescription'];
  }

  get secretToEmbed() {
    return this.secondFormGroup.controls['secretToEmbed'];
  }

  getData() {
  }

  acceptableFileType(): boolean {
    if(!this.file) {
      return true;
    }
    if(FILE_TYPES.includes(this.file.type)) {
      return false;
    }
    return true;
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  convertToBase64(file: File) {
    this.readFile(file);
  }
  
  validCollData() {
    if((this.collection.value?.length || 0) > 100) return false;
    if((this.collectionDescription.value?.length || 0) > 255) return false;
    return true;;
  }

  validNames() {
    if((this.collection.value?.length || 0) > 100) return false;
    if((this.collectionDescription.value?.length || 0) > 255) return false;
    if((this.fileName.value?.length || 0) > 100) return false;
    if((this.fileDescription.value?.length || 0) > 255) return false;
    return true;;
  }

  readFile(file: File) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      (this.myimage = filereader.result as string);
    };
  } 

}
