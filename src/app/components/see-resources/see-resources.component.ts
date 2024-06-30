import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { first } from 'rxjs';
import { CollectionResources } from 'src/app/interfaces/collection-resources';
import { Resource } from 'src/app/interfaces/resource';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AppService } from 'src/app/services/app/app.service';
import { ResourceService } from 'src/app/services/resource/resource.service';

@Component({
  selector: 'app-see-resources',
  templateUrl: './see-resources.component.html',
  styleUrls: ['./see-resources.component.scss']
})
export class SeeResourcesComponent implements OnInit {

  imageIds: number[] = new Array();

  collectionResources: CollectionResources[] = new Array();

  index: number = 0;
  indexes: number[] = [];
  images: string[] = ['', '', '', '', '', ''];
  @Output()
  page: EventEmitter<PageEvent> | undefined

  constructor(
    private adminService: AdminService,
    private appService: AppService,
    private resourceService: ResourceService
  ) {}

  ngOnInit(): void {
    this.getAllImages();
    this.images = ['', '', '', '', '', ''];
  }

  getImage(localI: number, i: number) {
    this.adminService.getImage(this.appService.getUserId(), this.imageIds[i]).subscribe({
      next: result => {
         this.images[localI] = result.imageBytes
      },
      error: err => {
      }
    });
  }

  getAllImages() {
    this.adminService.getAllImages(this.appService.getUserId()).subscribe({
      next: result => {
         this.imageIds = result
         this.images = ['', '', '', '', '', ''];
         for(let i = this.index; i < this.index + 6 && i < this.imageIds.length; i++) {
          this.getImage(i - this.index, i);
        }
      },
      error: err => {
        
      }
    });
  }

  onPaginateChange(pageEvent: PageEvent){
    this.index = pageEvent.pageIndex;
    this.images = ['', '', '', '', '', ''];
    for(let i = this.index * 6; i < this.index * 6 + 6 && i < this.imageIds.length; i++) {
      this.getImage(i - this.index * 6, i);
    }
  }

}
