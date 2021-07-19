import { Component, OnInit } from '@angular/core';
import { AddProductRequest } from '../models/add-product-request';
import { CompaniesData } from '../models/companies-response';
import { StatusCode } from '../models/status-codes';
import { DataAccessService } from '../services/data_access/data-access.service';
import { UtilityService } from '../services/utility.service';
declare var $: any;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  selectedCompany: number;
  productId: string;
  purchasePrice: number;
  quantity: number;
  description: string;

  companies:CompaniesData[]  = []

  addProductRequest: AddProductRequest = new AddProductRequest();

  constructor(private dataAccessService: DataAccessService, private utilityService: UtilityService) { 
    this.companies = this.utilityService.getCompanies();
  }

  ngOnInit(): void {
  }

  clearAll(){}

  addProduct(){
    if(this.quantity != null && this.selectedCompany != null && this.purchasePrice != null && this.description != null && this.productId != null && this.quantity > 0  && this.purchasePrice > 0 && this.description != '' && this.productId != ''){
      this.addProductRequest.companyId = this.selectedCompany;
      this.addProductRequest.desc = this.description;
      this.addProductRequest.productId = this.productId;
      this.addProductRequest.purchasePrice = this.purchasePrice;
      this.addProductRequest.quantity = this.quantity;

      this.dataAccessService.callAddProduct(this.addProductRequest).subscribe(
        res => {
          if(res.statusCode == StatusCode.SUCCESS_CODE){
            // Show Modal
            this.dataAccessService.setModal("Successful", "success");
            $("#info-model").modal("toggle");
          }
        }
      );

    }
  }

  allowNumberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
