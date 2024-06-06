import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CollectionResources } from 'src/app/interfaces/collection-resources';
import { PostResource } from 'src/app/interfaces/post-resource';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { UserAccountComponent } from '../user-account/user-account.component';
import { MatDialogRef } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { FILE_TYPES } from 'src/app/constants/constants';

@Component({
  selector: 'app-try-to-extract',
  templateUrl: './try-to-extract.component.html',
  styleUrls: ['./try-to-extract.component.scss']
})
export class TryToExtractComponent {

  algorithms: string[] = new Array('LSB_REPLACEMENT', 'LSB_MATCHING', 'LSB_MATCHING_REVISITED', 'BINARY_HAMMING_CODES', 'RANDOM_PIXEL_SELECTION', 'MULTI_BIT_PLANE');
  status: "initial" | "uploading" | "success" | "fail" = "initial";
  file: File | null = null;
  myimage: string = '';
  displayMessage: "ok" | "error" | "none" = "none";
  msg: string = '';

  firstFormGroup = this._formBuilder.group({
    fileName: ['', Validators.required]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private resourceService: ResourceService,
    public dialogRef: MatDialogRef<UserAccountComponent>
  ) {}

  ngOnInit(): void {}

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

  tryToExtract() {
    if (this.file) {
      const postResource : PostResource = {
        resourceDTO: {
          name: '',
          type: this.file.type,
          description: '',
          algorithm: '',
          saved: false,
          imageBytes: this.myimage
        },
        collectionDTO: {
          name: '',
          description: ''
        },
        secretToEmbed: ''
      };

      this.status = "uploading";
      this.displayMessage = 'none';

      this.resourceService.tryToExtract(postResource).subscribe({
        next: (data) => {
          this.status = "success";
          console.log(data);
          this.msg = data.message
          if(data.algorithm === 'NONE')
              this.displayMessage = 'error'
          else
              this.displayMessage = 'ok'
        },
        error: (error: any) => {
          this.displayMessage = 'error';
          this.status = "fail";
          return throwError(() => error);
        },
      });
    }
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
