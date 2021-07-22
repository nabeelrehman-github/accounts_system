import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataAccessService } from '../services/data_access/data-access.service';
import { InventoryDetailsData } from '../models/inventory-details';
import { StatusCode } from '../models/status-codes';
declare var $: any;

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  selectedCompany!: number;
  inventoryDetails: InventoryDetailsData[] = [];
  grandTotal: number = 0;

  constructor(private dataAccessService: DataAccessService, private router: Router) { 
    this.dataAccessService.callInventoryDetails().subscribe(
      res => {
        if(res.statusCode == StatusCode.SUCCESS_CODE){
          this.inventoryDetails = res.data.inventoryDetails;
          
          this.inventoryDetails.forEach(i => {
            this.grandTotal += i.purchasePrice * i.quantity;
          });
        }
      }
    )
   }
 
  ngOnInit(): void {
  }

  updateEntry(productId: string){
    // let selectedItem: StockDetails = this.inventoryDetails.find(i => i.productId == productId); // Getting Selectd Object.
    
    // let entry: AddUpdateEntry = { 
    //   isUpdate: true,
    //   entryId: productId,
    //   companyName: this.companies.find(i=>i.id == this.selectedCompany).name, // Getting company name base on id.
    //   modelName: selectedItem.modelName,
    //   purchasePrice: selectedItem.purchasePrice,
    //   salesPrice: selectedItem.salesPrice,
    //   alreadyInStock: selectedItem.inStockQuantity,
    //   venderName: selectedItem.vendorName };

    // this.dataAccessService.setAddUpdateItem(entry); // Update Subject.
    // this.router.navigate(['add_stock_item']);
  }
}
