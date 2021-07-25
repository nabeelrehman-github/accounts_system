import { Component, OnInit } from '@angular/core';
import { AddExpenseRequest } from '../models/add-expense-request';
import { StatusCode } from '../models/status-codes';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { DataAccessService } from '../services/data_access/data-access.service';
import { UtilityService } from '../services/utility.service';
declare var $: any;

@Component({
  selector: 'app-add-update-expense',
  templateUrl: './add-update-expense.component.html',
  styleUrls: ['./add-update-expense.component.css']
})
export class AddUpdateExpenseComponent implements OnInit {
  expenseDetails: string;
  amount: number;
  selectedBranch: number;
  isAdmin: boolean;
  branch: string;

  addExpenseRequest: AddExpenseRequest = new AddExpenseRequest();

  branchList = [
    { id: 1, name: 'Main Branch' }
  ]

  constructor(
    private dataAccessService: DataAccessService,
    private authService: AuthenticationService,
    private utilityService: UtilityService
  ) {
    this.authService.getRole().subscribe(
      res => {
        if (!(res === null)) {
          if (res == 'admin') {
            this.isAdmin = true;
            this.branch = null;
          } else
            this.branch = this.branchList.find(i => i.id == this.utilityService.getBranch()).name
        }
      }
    )
  }

  ngOnInit(): void {
  }

  addExpense() {
    if (this.expenseDetails != null && this.expenseDetails != '' && this.amount != null && (this.branch != null || this.selectedBranch != null)) {
      this.addExpenseRequest.amount = this.amount;
      this.addExpenseRequest.expenseBranch = this.isAdmin ? this.selectedBranch : this.branchList.find(i => i.name == this.branch).id;
      this.addExpenseRequest.expenseDetails = this.expenseDetails;

      this.dataAccessService.callAddExpense(this.addExpenseRequest).subscribe(
        res => {
          if(res.statusCode == StatusCode.SUCCESS_CODE){
            this.dataAccessService.setModal("Successful", "success");
            $("#info-model").modal("toggle");
          }else{
            this.dataAccessService.setModal(res.statusDesc, "success");
            $("#info-model").modal("toggle");
          }
        },
        error => {
          this.dataAccessService.setModal(error, "success");
            $("#info-model").modal("toggle");
        }
      )
    }
  }

  clearAll() {
    this.amount = null;
    this.selectedBranch = null;
    this.expenseDetails = null;
  }

  allowNumberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
