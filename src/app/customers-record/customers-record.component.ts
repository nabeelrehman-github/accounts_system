import { Component, OnInit } from '@angular/core';
import { CustomerRecordData, CustomerRecordResponse } from '../models/customer-record-response';
import { StatusCode } from '../models/status-codes';
import { DataAccessService } from '../services/data_access/data-access.service';

@Component({
  selector: 'app-customers-record',
  templateUrl: './customers-record.component.html',
  styleUrls: ['./customers-record.component.css']
})
export class CustomersRecordComponent implements OnInit {

  customerRecord: CustomerRecordData[];
  supplierRecord: CustomerRecordData[];

  currentDisplayList: CustomerRecordData[];

  selectedCustomer: number;

  customerType = [
    { id: 1, value: 'Customer' },
    { id: 2, value: 'Supplier' }
  ]

  constructor(private dataAccessService: DataAccessService) {
    this.dataAccessService.callCustomerRecordDetails().subscribe(
      res => {
        if (res.statusCode == StatusCode.SUCCESS_CODE) {
          this.customerRecord = res.data.customer.filter(i => i.customerType == 1)
          this.supplierRecord = res.data.customer.filter(i => i.customerType == 2)
        }
      }
    );
  }

  ngOnInit(): void {
  }

  onCustomerChange() {
    if (this.selectedCustomer == 1)
      this.currentDisplayList = this.customerRecord;
    else
      this.currentDisplayList = this.supplierRecord;
  }
}
