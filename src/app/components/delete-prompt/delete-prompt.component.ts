import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { AppService } from 'src/app/services/app/app.service';
import { ResourceService } from 'src/app/services/resource/resource.service';

@Component({
  selector: 'app-delete-prompt',
  templateUrl: './delete-prompt.component.html',
  styleUrls: ['./delete-prompt.component.scss']
})
export class DeletePromptComponent implements OnInit {

  resName: string = '';
  collName: string = '';
  deleteColl: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DeletePromptComponent>,
    private appService: AppService,
    private resourceService: ResourceService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fill();
  }

  fill() {
    this.collName = this.appService.getCurrentCollectionName();
    this.resName = this.appService.getCurrentResourceName();
    this.deleteColl = this.appService.getDeleteCollection();
    this.appService.setDeleted(false);
  }
  
  onCloseDialog() {
    this.dialogRef.close();
  }

  deleteResource() {
    this.resourceService.deleteResource(
      this.collName,
      this.resName
    ).subscribe({
      next: result => {
        this.messageService.add({ severity: 'success', summary: 'Success: ', detail: 'The resource has been removed.' });
        this.appService.setDeleted(true);
        this.onCloseDialog();
        // console.log(result);
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Failed: ', detail: 'The resource has not been removed.' });
        // console.log("error ");
        // console.log(err);
      }
    });;
  }

}
