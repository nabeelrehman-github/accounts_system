import { Component, OnInit } from '@angular/core';
import { ProductDetails } from '../models/prefetch-response';
import { StatusCode } from '../models/status-codes';
import { UpdateInventoryRequest } from '../models/update-inventory-request';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { DataAccessService } from '../services/data_access/data-access.service';
import { UtilityService } from '../services/utility.service';
declare var $: any;


@Component({
  selector: 'app-update-inventory',
  templateUrl: './update-inventory.component.html',
  styleUrls: ['./update-inventory.component.css']
})
export class UpdateInventoryComponent implements OnInit {
  selectedModel: string;
  quantity: number;
  selectedCompany: number;
  models: ProductDetails.Models[] = [];
  products: ProductDetails.Companies[] = [];
  isAdmin: boolean;
  branch: string;
  selectedBranch: number;

  branchList = [
    { id: 1, name: 'Main Branch' }
  ]

  constructor(
    private dataAccessService: DataAccessService,
    private utilityService: UtilityService,
    private authService: AuthenticationService) {
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
    this.products = this.utilityService.getProducts();
  }

  ngOnInit(): void {
  }

  onChangeCompany() {
    this.models = this.products.find(i => i.id == this.selectedCompany).models
  }

  allowNumberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  clearAll() { 
    this.selectedModel = null;
    this.selectedCompany = null;
    this.quantity = null;
  }
  update() {
    if (this.selectedCompany != null && this.selectedModel != null && this.quantity != null && this.quantity > 0) {
      let request: UpdateInventoryRequest = new UpdateInventoryRequest();

      request.forBranchId = this.selectedBranch;
      request.productId = this.selectedModel;
      request.quantity = this.quantity;

      this.dataAccessService.callUpdateInventory(request).subscribe(
        res => {
          if (res.statusCode == StatusCode.SUCCESS_CODE) {
            this.dataAccessService.setModal("Update Successful", "success");
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
      );
    }
  }

}
