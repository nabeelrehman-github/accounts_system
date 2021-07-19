import { Component, OnInit } from '@angular/core';
import { InvoiceReceipt } from '../models/invoice-receipt';
import { UtilityService } from '../services/utility.service';
declare var $: any;
@Component({
  selector: 'app-invoice-receipt',
  templateUrl: './invoice-receipt.component.html',
  styleUrls: ['./invoice-receipt.component.css']
})
export class InvoiceReceiptComponent implements OnInit {
  invoiceReceipt: InvoiceReceipt = new InvoiceReceipt();
  
  constructor(private utilityService: UtilityService) {
    // console.log(this.utilityService.getInvoiceReceipt())
    this.invoiceReceipt = this.utilityService.getInvoiceReceipt();
  }
  ngOnInit(): void {
  }

}
