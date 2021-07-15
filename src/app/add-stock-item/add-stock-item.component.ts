import { Component, OnInit } from '@angular/core';
import { DataAccessService } from '../services/data_access/data-access.service';
import { InvoiceItem } from '../models/InvoiceItem';
declare var $: any;

@Component({
  selector: 'app-add-stock-item',
  templateUrl: './add-stock-item.component.html',
  styleUrls: ['./add-stock-item.component.css']
})
export class AddStockItemComponent implements OnInit {
  isUpdate!: boolean;
  isAdd!: boolean;

  company: string = 'company';
  vendor: string = 'vendor';
  purchasePrice!: number;
  salesPrice!: number;

  newQuantity!: number;
  modelName: string = this.isUpdate ? 'model name' : '';

  alreadyInStock: number = 10;

  selectedCompany!: number;
  selectedModel!: number;
  selectedVendor!: number;

  companies = [
    { id: 1, name: 'Osaka' },
    { id: 2, name: 'Exide' },
    { id: 3, name: 'Power' },
    { id: 4, name: 'Audi' },
    { id: 5, name: 'AGS' }
  ];

  models = [
    { id: 1, name: 'LX-1', rate: 15000 },
    { id: 2, name: 'LX-2', rate: 16000 },
    { id: 3, name: 'LX-3', rate: 17000 },
    { id: 4, name: 'LX-4', rate: 18000 }
  ];

  vendors = [
    { id: 1, name: 'Subhan Traders', address: 'ABC' },
    { id: 2, name: 'Osaka Premium Traders', address: 'XYZ' }
  ];

  productList: InvoiceItem[] = []

  constructor(public dataAccess: DataAccessService) {
  }

  ngOnInit(): void {
    this.dataAccess.getAddUpdateItem().subscribe(
      res => {
        this.isUpdate = res.isUpdate === undefined ? false : res.isUpdate;
        this.isAdd = !this.isUpdate;
        if (this.isUpdate) {
          this.company = res.companyName;
          this.modelName = res.modelName;
          this.vendor = res.venderName;
          this.alreadyInStock = res.alreadyInStock;
          this.salesPrice = res.salesPrice;
          this.purchasePrice = res.purchasePrice;
        }
      }
    );
  }
  clearAll() {

  }

  submit() {
    //   this.productList.push(new InvoiceItem(this.id, this.productName, "Sales Product", this.dateAdded));
    //   console.log(this.productList)
    //   this.dataAccess.setModal("Success", "success");
    //   $("#info-model").modal("toggle");
  }
}
