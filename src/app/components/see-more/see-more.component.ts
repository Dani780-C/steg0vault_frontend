import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app/app.service';

@Component({
  selector: 'app-see-more',
  templateUrl: './see-more.component.html',
  styleUrls: ['./see-more.component.scss']
})
export class SeeMoreComponent implements OnInit {
  
  str: string = '';

  constructor(
    private appService: AppService
  ){}

  ngOnInit(): void {
    this.str = this.appService.getSeeMoreStr();
  }
  
}
