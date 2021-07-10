import { Component, OnInit } from '@angular/core';
import { DataAccessService } from '../data-access.service';
import { Product } from '../models/product';
declare var $: any;

@Component({
  selector: 'app-add-stock-item',
  templateUrl: './add-stock-item.component.html',
  styleUrls: ['./add-stock-item.component.css']
})
export class AddStockItemComponent implements OnInit {
  id = "";
  itemsPerBoxDisabled = false;
  dateAdded = new Date().toLocaleDateString();
  productName = "";
  quantity = "";
  itemPerBox = "";
  salesPrice = "";
  purchasePrice = "";
  category = "";
  isChecked = false;

  productList: Product[] = []

  constructor(public dataAccess: DataAccessService) { }

  ngOnInit(): void {
  }

  checked() {
    this.itemsPerBoxDisabled = !this.itemsPerBoxDisabled;
  }
  disableCheckbox() {
    return this.itemsPerBoxDisabled;
  }
  clearAll() {
    this.id = "";
    this.dateAdded = new Date().toLocaleDateString();
    this.productName = "";
    this.quantity = "";
    this.itemPerBox = "";
    this.salesPrice = "";
    this.purchasePrice = "";
    this.isChecked = false;
    this.itemsPerBoxDisabled = false;
    this.category = "";
  }

  submit() {
    this.productList.push(new Product(this.id, this.productName, "Sales Product", this.dateAdded));
    console.log(this.productList)
    this.dataAccess.setModal("Success", "success");
    $("#info-model").modal("toggle");
  }
}
