import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AppService } from 'src/app/services/app/app.service';
import { UserDetails } from '../get-more-info/get-more-info.component';

@Component({
  selector: 'app-alg-info',
  templateUrl: './alg-info.component.html',
  styleUrls: ['./alg-info.component.scss']
})
export class AlgInfoComponent implements OnInit {
  constructor(
    private admin: AdminService,
    private appService: AppService
  ) {}

  algName: string = '';
  total: number = 0;
  active: number = 0;

  ngOnInit(): void {
    this.algName = this.appService.getAlgName()
    this.getMoreInfo();
  }

  getMoreInfo() {
    this.admin.getAlgInfo(this.appService.getAlgName()).subscribe({
      next: result => {
        this.active = result.actives
        this.total = result.total
      },
      error: err => {}
    });
  }
}
