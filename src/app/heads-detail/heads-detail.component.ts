import { Component, OnInit } from '@angular/core';
import { HeadDetailsData } from '../models/head-details-response';
import { StatusCode } from '../models/status-codes';
import { DataAccessService } from '../services/data_access/data-access.service';

@Component({
  selector: 'app-heads-detail',
  templateUrl: './heads-detail.component.html',
  styleUrls: ['./heads-detail.component.css']
})
export class HeadsDetailComponent implements OnInit {
  headsDetails1: HeadDetailsData[] = [];
  headsDetails2: HeadDetailsData[] = [];

  constructor(private dataAccessService: DataAccessService) {
    this.dataAccessService.callMainHeadsDetails().subscribe(
      res => {
        if(res.statusCode == StatusCode.SUCCESS_CODE){
          this.headsDetails1.push(res.data.headDetails[0]);
          this.headsDetails1.push(res.data.headDetails[1]);
          this.headsDetails1.push(res.data.headDetails[2]);
          this.headsDetails1.push(res.data.headDetails[3]);

          this.headsDetails2.push(res.data.headDetails[4]);
          this.headsDetails2.push(res.data.headDetails[5]);
          this.headsDetails2.push(res.data.headDetails[6]);
          this.headsDetails2.push(res.data.headDetails[7]);
        }
      }
    )
   }

  ngOnInit(): void {
  }

}
