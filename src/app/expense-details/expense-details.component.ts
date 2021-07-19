import { Component, OnInit } from '@angular/core';
import { ExpenseDetailsData } from '../models/expense-details-response';
import { StatusCode } from '../models/status-codes';
import { DataAccessService } from '../services/data_access/data-access.service';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.css']
})
export class ExpenseDetailsComponent implements OnInit {
  expenseDetails: ExpenseDetailsData[];

  constructor(private dataAccessService: DataAccessService) {
    this.dataAccessService.callExpenseDetails().subscribe(
      res => {
        if(res.statusCode == StatusCode.SUCCESS_CODE){
          this.expenseDetails = res.data.expenseDetails;
        }
      }
    );
   }

  ngOnInit(): void {
  }

}
