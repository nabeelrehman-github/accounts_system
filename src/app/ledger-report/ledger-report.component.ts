import { Component, OnInit } from '@angular/core';
import { Customers } from '../models/prefetch-response';
import { DataAccessService } from '../services/data_access/data-access.service';
import { UtilityService } from '../services/utility.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-ledger-report',
  templateUrl: './ledger-report.component.html',
  styleUrls: ['./ledger-report.component.css']
})

export class LedgerReportComponent implements OnInit {
  selectedCustomerType: number;
  selectedCustomer: number;
  customers: Customers[] = [];
  displayCustomers: Customers[] = [];
  dateFrom: string;
  dateTo: string;
  customerType = [
    { id: 1, value: "Customer" },
    { id: 2, value: "Supplier" }
  ]

  constructor(
    private dataAccessService: DataAccessService,
    private utilityService: UtilityService,
    private datePipe: DatePipe) {
    this.selectedCustomerType = 1;
    this.customers = this.utilityService.getCustomers();
    this.displayCustomers = this.customers.filter(i => i.customerType == 1);
  }

  ngOnInit(): void {
  }

  onCustomerTypeChange() {
    this.displayCustomers = this.customers.filter(i => i.customerType == this.selectedCustomerType);
  }

  formatFromDate() {
    let dFrom = new Date(this.dateFrom);
    this.dateFrom = this.datePipe.transform(dFrom, 'dd/MM/yyyy').toString();
  }

  formatToDate(){
    let dTo = new Date(this.dateTo);
    this.dateTo = this.datePipe.transform(dTo, 'dd/MM/yyyy').toString();
  }

  downloadReport() {
    this.dataAccessService.callDownloadLedgerReport(this.selectedCustomer, this.dateFrom, this.dateTo);
  }

  clearAll() {
    this.selectedCustomer = null;
    this.selectedCustomerType = null;
    this.dateTo = null;
    this.dateFrom = null;
   }
}
