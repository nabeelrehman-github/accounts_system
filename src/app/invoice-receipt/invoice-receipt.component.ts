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
  totalQuantity: number = 0;
  netTotal: number = 0;
  constructor(private utilityService: UtilityService) {
    // console.log(this.utilityService.getInvoiceReceipt())
    this.invoiceReceipt = this.utilityService.getInvoiceReceipt();
    
    this.invoiceReceipt.invoiceItem.forEach(i =>{
      this.totalQuantity = Number(this.totalQuantity) + Number(i.quantity);
      this.netTotal = Number(this.netTotal) + Number(i.total);
    });
  }
  ngOnInit(): void {
  }

}
