import { Component, OnInit } from '@angular/core';
import { InvoiceSummariesRequest } from '../models/invoice-summaries-request';
import { InvoiceSummariesData } from '../models/invoice-summaries-response';
import { Customers } from '../models/prefetch-response';
import { StatusCode } from '../models/status-codes';
import { DataAccessService } from '../services/data_access/data-access.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-invoice-summaries',
  templateUrl: './invoice-summaries.component.html',
  styleUrls: ['./invoice-summaries.component.css']
})
export class InvoiceSummariesComponent implements OnInit {
  summariesDetail: InvoiceSummariesData[];

  invoiceSummariesRequest: InvoiceSummariesRequest = new InvoiceSummariesRequest();
  selectedCustomer: number;
  selectedCustomerType: number;

  customerType = [
    { id: 1, value: 'Customer' },
    { id: 2, value: 'Supplier' }
  ]

  customers: Customers[] = [];
  displayCustomers: Customers[] = [];

  constructor(
    private dataAccessService: DataAccessService,
    private utilityService: UtilityService) {
    this.utilityService.getCustomerDetails().subscribe(
      res => {
        if(res != null){
          this.customers = res;
          this.selectedCustomerType = 1;
          this.displayCustomers = this.customers.filter(i => i.customerType == this.selectedCustomerType);
          this.selectedCustomer = this.displayCustomers[0].id;
          console.log(this.selectedCustomer)
          this.onCustomerChange();
          this.displayCustomers = this.customers;
        }
      }
    )
   }

  ngOnInit(): void {
  }

  onCustomerChange() {
    this.invoiceSummariesRequest.customerId = this.selectedCustomer;
  }

  onCustomerTypeChange(){
    this.displayCustomers = this.customers.filter(i => i.customerType == this.selectedCustomerType);
  }

  fetchSummaries(){
    if(this.invoiceSummariesRequest.customerId != null){
      this.dataAccessService.callInvoiceSummariesDetails(this.invoiceSummariesRequest).subscribe(
        res => {
          if(res.statusCode == StatusCode.SUCCESS_CODE){
            this.summariesDetail = res.data.invoiceSummaries;
          }
        }
      )
    }
  }

  getRow(invoiceNumber: number){
    
  }
}
