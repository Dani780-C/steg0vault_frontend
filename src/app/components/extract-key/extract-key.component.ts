import { Component, OnInit } from '@angular/core';
import { ExtractedResource } from 'src/app/interfaces/extracted-resource';
import { AppService } from 'src/app/services/app/app.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-extract-key',
  templateUrl: './extract-key.component.html',
  styleUrls: ['./extract-key.component.scss']
})
export class ExtractKeyComponent implements OnInit {

  result: ExtractedResource = {
    imageBytes: '',
    algorithm: '',
    name: '',
    secretToEmbed: ''
  };

  constructor(
    private appService: AppService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getResource();
  }

  getResource() {
    if(this.appService.getCurrentExtractedResourceName() !== null && this.appService.getCurrentExtractedResourceName() !== '' && 
      this.appService.getCurrentExtractedCollectionName() !== null && this.appService.getCurrentExtractedCollectionName() !== '')
    {
      this.result.imageBytes = this.appService.getCurrentBytes();
      this.userService.getResourceByName(
        this.appService.getCurrentExtractedResourceName(),
        this.appService.getCurrentExtractedCollectionName()
      ).subscribe({
        next: result => {
          this.result.secretToEmbed = result.message;
          this.result.imageBytes = result.imageBytes;
          this.result.algorithm = result.algorithm;
          this.result.name = result.name;
          console.log(this.result);
        },
        error: err => {
          console.log(this.appService.getCurrentExtractedResourceName(),
          this.appService.getCurrentExtractedCollectionName());
          console.log(err);
        }
      });
    }
  }

}
