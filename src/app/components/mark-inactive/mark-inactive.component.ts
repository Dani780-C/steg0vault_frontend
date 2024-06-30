import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AppService } from 'src/app/services/app/app.service';
import { UserDetails } from '../get-more-info/get-more-info.component';
import { MessageService } from 'primeng/api';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mark-inactive',
  templateUrl: './mark-inactive.component.html',
  styleUrls: ['./mark-inactive.component.scss']
})
export class MarkInactiveComponent implements OnInit {
  constructor(
    private admin: AdminService,
    private appService: AppService,
    private messageService: MessageService,
    public dialogRef: MatDialogRef<MarkInactiveComponent>,
  ) {}

  user: string = '';
  clicked: boolean = false;

  ngOnInit(): void {
    this.user = this.appService.getUserToBeDeleted();
    this.clicked = false;
  }

  markAsInactive() {
    this.admin.markAsInactive(this.appService.getUserId(), this.clicked).subscribe({
      next: result => {
        this.messageService.add({ severity: 'success', summary: 'Success:', detail: 'User has been deleted!' });
        this.onCloseDialog();
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Failed:', detail: 'Something went wrong!' });
        this.onCloseDialog();
      }
    });
    this.clicked = false;
  }

  switchCheckbox() {
    this.clicked = !this.clicked;
  }

  onCloseDialog() {
    this.dialogRef.close();
  }
}
