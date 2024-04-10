import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { AppService } from 'src/app/services/app/app.service';
import { ResourceService } from 'src/app/services/resource/resource.service';

@Component({
  selector: 'app-delete-collection-prompt',
  templateUrl: './delete-collection-prompt.component.html',
  styleUrls: ['./delete-collection-prompt.component.scss']
})
export class DeleteCollectionPromptComponent implements OnInit {

  collName: string = '';
  resLength: number = 0;

  constructor(
    public dialogRef: MatDialogRef<DeleteCollectionPromptComponent>,
    private appService: AppService,
    private resourceService: ResourceService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fill();
  }

  fill() {
    this.collName = this.appService.getCurrentCollectionName();
    this.resLength = this.appService.getResLength();
    this.appService.setCollDeleted(false);
  }
  
  onCloseDialog() {
    this.dialogRef.close();
  }

  deleteCollection() {
    this.resourceService.deleteCollection(
      this.collName
    ).subscribe({
      next: result => {
        this.messageService.add({ severity: 'success', summary: 'Success: ', detail: 'The collection has been removed.' });
        this.appService.setCollDeleted(true);
        this.onCloseDialog();
        // console.log(result);
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Failed: ', detail: 'The collection has not been removed.' });
        // console.log("error ");
        // console.log(err);
      }
    });;
  }
}
