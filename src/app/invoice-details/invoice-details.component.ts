import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceDetailsRequest } from '../models/invoice-details-request';
import { InvoiceSummaryDetailsData } from '../models/invoice-details-response';
import { StatusCode } from '../models/status-codes';
import { DataAccessService } from '../services/data_access/data-access.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {
  request: InvoiceDetailsRequest = new InvoiceDetailsRequest();
  invoiceSummaryDetails: InvoiceSummaryDetailsData[] = [];
  constructor(
    private dataAccessService: DataAccessService,
    private route: ActivatedRoute) {

    this.request.invoiceSummaryId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.dataAccessService.callInvoiceSummaryDetails(this.request).subscribe(
      res => {
        if(res.statusCode == StatusCode.SUCCESS_CODE){
          this.invoiceSummaryDetails = res.data.invoiceDetails;
        }
      }
    );

   }

  ngOnInit(): void {
  }

}
