import { Component, OnInit } from '@angular/core';
import { AdjustAmountRequest } from '../models/adjust-amount-request';
import { StatusCode } from '../models/status-codes';
import { DataAccessService } from '../services/data_access/data-access.service';
declare var $: any;

@Component({
  selector: 'app-adjust-payment',
  templateUrl: './adjust-payment.component.html',
  styleUrls: ['./adjust-payment.component.css']
})
export class AdjustPaymentComponent implements OnInit {

  selectedCustomerType: number;
  selectedAdjustmentType: number;
  invoiceNumber: number;
  amount: number;

  customerType = [
    { id: '1', name: 'Customer' },
    { id: '2', name: 'Supplier' }
  ]

  adjustmentType = [
    { id: '1', name: 'Cash' },
    { id: '2', name: 'Bank' },
    { id: '4', name: 'Adjustment' }
  ]

  constructor(private dataAccessService: DataAccessService) { }

  ngOnInit(): void {
  }

  allowNumberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  clearAll() {
    this.selectedAdjustmentType = null;
    this.selectedCustomerType = null;
    this.amount = null;
    this.invoiceNumber = null;
  }

  adjust() {
    this.dataAccessService.setModal("Adjustment Successful", "success");
    $("#info-model").modal("toggle");
    if (this.selectedCustomerType != null && this.selectedAdjustmentType != null && this.amount != null && this.invoiceNumber != null) {
      let adjustRequest: AdjustAmountRequest = new AdjustAmountRequest();

      adjustRequest.customerType = this.selectedCustomerType;
      adjustRequest.invoiceNumber = this.invoiceNumber;
      adjustRequest.amount = this.amount;
      adjustRequest.adjustmentType = this.selectedAdjustmentType;


      this.dataAccessService.callAdjustAmount(adjustRequest).subscribe(
        res => {
          if (res.statusCode == StatusCode.SUCCESS_CODE) {
            this.dataAccessService.setModal("Adjustment Successful", "success");
            $("#info-model").modal("toggle");
          } else {
            this.dataAccessService.setModal(res.statusDesc, "danger");
            $("#info-model").modal("toggle");
          }
        }
      )
    }
  }

}
