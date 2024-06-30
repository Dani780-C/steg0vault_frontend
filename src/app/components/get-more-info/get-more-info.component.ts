import { Component, OnInit } from '@angular/core';
import { Obj } from '@popperjs/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AppService } from 'src/app/services/app/app.service';

@Component({
  selector: 'app-get-more-info',
  templateUrl: './get-more-info.component.html',
  styleUrls: ['./get-more-info.component.scss']
})
export class GetMoreInfoComponent implements OnInit {

  constructor(
    private admin: AdminService,
    private appService: AppService
  ) {}

  userDetails: UserDetails = {
    numberOfCollections: 0,
    numberOfResources: 0,
    totalMemory: 0,
    userLogs: [],
    collectionLogs: [],
    resourceLogs: []
  };

  ngOnInit(): void {
    this.getMoreInfo();
  }

  getMoreInfo() {
    this.admin.getMoreInfo(this.appService.getUserId()).subscribe({
      next: result => {
        this.userDetails = result;
      },
      error: err => {}
    });
  }

}

export interface Action {
  name: string,
  info: string
}

export interface CollectionAction {
  name: string,
  actionList: Array<Action>
}

export interface UserDetails {
  numberOfCollections: number,
  numberOfResources: number,
  totalMemory: number,
  userLogs: Array<Action>,
  collectionLogs: Array<CollectionAction>,
  resourceLogs: Array<CollectionAction>
}