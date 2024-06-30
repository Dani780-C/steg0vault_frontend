import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { AppService } from 'src/app/services/app/app.service';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { DeletePromptComponent } from '../delete-prompt/delete-prompt.component';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent {
  
  constructor(
    public dialogRef: MatDialogRef<DeletePromptComponent>,
    private userService: UserService,
    private messageService: MessageService,
    private storage: StorageService,
    private route: Router
  ) {}
  
  onCloseDialog() {
    this.dialogRef.close();
  }

  deleteAccount() {
    this.userService.deleteAccount().subscribe({
      next: result => {
        this.storage.deleteJwtToken();
        this.onCloseDialog();
        this.route.navigate(['register']);
      },
      error: err => {
      }
    });
  }
}
