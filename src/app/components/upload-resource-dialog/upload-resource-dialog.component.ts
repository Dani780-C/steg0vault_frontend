import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { throwError} from 'rxjs';
import { FILE_TYPES } from 'src/app/constants/constants';
import { CollectionResources } from 'src/app/interfaces/collection-resources';
import { PostResource } from 'src/app/interfaces/post-resource';
import { UserService } from 'src/app/services/user/user.service'
import { UserAccountComponent } from '../user-account/user-account.component';

@Component({
  selector: 'app-upload-resource-dialog',
  templateUrl: './upload-resource-dialog.component.html',
  styleUrls: ['./upload-resource-dialog.component.scss']
})
export class UploadResourceDialogComponent implements OnInit {
  
  collectionResources: CollectionResources[] = new Array();
  algorithms: string[] = new Array('A_TYPE1', 'A_TYPE2', 'A_TYPE3', 'A_TYPE4');
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
    private userService: UserService,
    public dialogRef: MatDialogRef<UserAccountComponent>
  ) {}

  validateCollection(): boolean {
    if(this.collectionResources) {
      for(let i = 0; i < this.collectionResources.length; i++) {
        // console.log("here");
        if(this.collectionResources[i].collectionDTO.name === this.collection.value) {
          console.log("here");
          return true;
        }
      }
      return false;
    }
    return false;
  }

  validateFilename(): boolean {
    
    for(let i=0 ;i<this.collectionResources.length;i++){
      if(this.collectionResources[i].collectionDTO.name===this.collection.value){
        for(let j=0 ;j<this.collectionResources[i].resourceNameAndDescriptionDTO.length;j++){
          if(this.collectionResources[i].resourceNameAndDescriptionDTO[j].name === this.fileName.value){
            return true;
          }
        }
      }
    }
    return false;
  }

  ngOnInit(): void {
    this.getAllCollections();
  }

  getAllCollections() {
    this.userService.getAllCollections().subscribe({
      next: result => {
        this.collectionResources = [];
        result.forEach((collectionResource: CollectionResources) => {
          this.collectionResources.push(collectionResource);
        });
        // console.log("Collections: ");
        // console.log(this.collections);
      },
      error: err => {
        console.log(err);
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
          name: (this.fileName.value !== null) ? this.fileName.value.trim() : null,
          type: this.file.type,
          description: this.fileDescription.value,
          algorithm: this.algorithm.value,
          saved: false,
          imageBytes: this.myimage
        },
        secretToEmbed: this.secretToEmbed.value,
        collectionDTO: {
          name: (this.collection.value !== null) ? this.collection.value.trim() : null,
          description: this.collectionDescription.value
        }
      };

      this.status = "uploading";

      this.userService.postResource(postResource).subscribe({
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
    console.log('reset');
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
    console.log(this.secondFormGroup);
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
  
  readFile(file: File) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      (this.myimage = filereader.result as string);
    };
  } 

}
