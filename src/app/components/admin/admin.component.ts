import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Overlay } from '@angular/cdk/overlay';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';
import { MessageService } from 'primeng/api';
import { AddAdminComponent } from '../add-admin/add-admin.component';
import { AddAlgorithmComponent } from '../add-algorithm/add-algorithm.component';
import { GetMoreInfoComponent } from '../get-more-info/get-more-info.component';
import { AppService } from 'src/app/services/app/app.service';
import { MarkInactiveComponent } from '../mark-inactive/mark-inactive.component';
import { SeeResourcesComponent } from '../see-resources/see-resources.component';
import { AlgInfoComponent } from '../alg-info/alg-info.component';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['position', 'name', 'email', 'lastActiveDate', 'createdAt', 'deletedAt', 'action'];
  displayedColumnsAlg: string[] = ['position', 'name', 'createdAt', 'deletedAt', 'action'];
  ELEMENT_DATA: User[] = [];
  ELEMENT_DATA_ALGORITHM: Algorithm[] = [];
  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
  dataSourceAlg = new MatTableDataSource<Algorithm>(this.ELEMENT_DATA_ALGORITHM);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  fullName: string = '';
  mail: string = '';

  ngAfterViewInit() {
  }

  constructor(
    private storageService: StorageService, 
    private router: Router, 
    private adminService: AdminService,
    private appService: AppService,
    private dialog: MatDialog,
    private overlay: Overlay,
    private messageService: MessageService
  ) {
    this.fullName = '';
    this.mail = localStorage.getItem('mail') || '';
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllAlgs();
  }

  getAllUsers() {
    this.adminService.getAllUsers().subscribe({
      next: result => {
        this.ELEMENT_DATA = [];
        result.forEach((user: User) => {
          this.ELEMENT_DATA.push(user);
        });
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA)
        this.dataSource.paginator = this.paginator;
        this.fullName = localStorage.getItem('name') || '';
      },
      error: err => {
      }
    });
  }

  getAllAlgs() {
    this.adminService.getAllAlgs().subscribe({
      next: result => {
        this.ELEMENT_DATA_ALGORITHM = [];
        result.forEach((alg: Algorithm) => {
          this.ELEMENT_DATA_ALGORITHM.push(alg);
        });
        this.dataSourceAlg = new MatTableDataSource<Algorithm>(this.ELEMENT_DATA_ALGORITHM)
      },
      error: err => {
      }
    });
  }


  logout(): void {
    this.storageService.removeToken();
    this.storageService.removeEmail();
    this.router.navigate(['/login']);
  }


  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  editUser() {
    const dialogRef = this.dialog.open(EditUserComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
      this.fullName = this.storageService.getCurrentlyLoggedUsername() || '';
    });
  }

  deleteAccount() {
    const dialogRef = this.dialog.open(DeleteAccountComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  addAdmin() {
    const dialogRef = this.dialog.open(AddAdminComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  addAlgorithm() {
    const dialogRef = this.dialog.open(AddAlgorithmComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllAlgs();
    });
  }

  getMoreInfo(id: number) {
    this.appService.setUserId(id);
    const dialogRef = this.dialog.open(GetMoreInfoComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  markAsInactive(id: number, email: string) {
    this.appService.setUserId(id);
    this.appService.setUserToBeDeleted(email);
    const dialogRef = this.dialog.open(MarkInactiveComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsers();
    });
  }

  seeResources(id: number) {
    this.appService.setUserId(id);
    const dialogRef = this.dialog.open(SeeResourcesComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  disableAlgorithm(name: string) {
    this.adminService.disableAlg(name).subscribe({
      next: result => {
        this.getAllAlgs()
      },
      error: err => {
      }
    });
  }

  enableAlgorithm(name: string) {
    this.adminService.enableAlg(name).subscribe({
      next: result => {
        this.getAllAlgs()
      },
      error: err => {
      }
    });
  }

  seeAlgInfo(name: string) {
    this.appService.setAlgName(name);
    const dialogRef = this.dialog.open(AlgInfoComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

export interface User {
  position: number,
  id: number,
  fullName: string,
  email: string,
  lastActiveDate: string,
  deletedAt: string,
  createdAt: string
  action: string,
  role: string
}

export interface Algorithm {
  position: number,
  id: number,
  name: string,
  deletedAt: string,
  createdAt: string
  action: string
}
