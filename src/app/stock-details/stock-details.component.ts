import { Component, OnInit } from '@angular/core';
import { DataAccessService } from '../data-access.service';
import { ProductDetails } from '../models/productDetails';
declare var $: any;

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {

  idDisabled = true;
  id = "";
  customId = "";
  itemsPerBoxDisabled = false;
  dateAdded = new Date().toLocaleDateString();
  productName = "";
  company = "";
  model = "";
  quantity = "";
  itemPerBox = "";
  salesPrice = "";
  purchasePrice = "";
  isChecked = false;

  productList: ProductDetails[] = [
    { id: "101", customId: "LTR-5200", name: "Plastic Plate Small", company: "Toyota", model: "Vigo", itemPerBox: 12, quantity: 150, purchasePrice: 80, salesPrice: 100, lastStockEntry: new Date().toLocaleDateString() },
    { id: "102", customId: "LTR-5200", name: "Plastic Plate Small", company: "Toyota", model: "Vigo", itemPerBox: 12, quantity: 150, purchasePrice: 80, salesPrice: 100, lastStockEntry: new Date().toLocaleDateString() },
    { id: "103", customId: "LTR-5200", name: "Plastic Plate Small", company: "Toyota", model: "Vigo", itemPerBox: 12, quantity: 150, purchasePrice: 80, salesPrice: 100, lastStockEntry: new Date().toLocaleDateString() },
    { id: "104", customId: "LTR-5200", name: "Plastic Plate Small", company: "Toyota", model: "Vigo", itemPerBox: 12, quantity: 150, purchasePrice: 80, salesPrice: 100, lastStockEntry: new Date().toLocaleDateString() }
  ];

  constructor(public dataAccess: DataAccessService) { }

  ngOnInit(): void {
  }

  checked() {
    this.itemPerBox = ""
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
    this.idDisabled = true;
  }

  getRow(id: number) {
    this.idDisabled = true;
    this.id = this.productList[id].id;
    this.productName = this.productList[id].name
    this.company = this.productList[id].company.toString();
    this.model = this.productList[id].model.toString();
    this.quantity = this.productList[id].quantity.toString();
    this.customId = this.productList[id].customId;

    if (this.productList[id].itemPerBox > -1) {
      this.itemPerBox = this.productList[id].itemPerBox.toString();
      this.isChecked = true;
      this.itemsPerBoxDisabled = true;
    }
    else {
      this.itemPerBox = ""
      this.isChecked = false;
      this.itemsPerBoxDisabled = false;
    }

    this.salesPrice = this.productList[id].salesPrice.toString();
    this.purchasePrice = this.productList[id].purchasePrice.toString();
  }

  submit() {
    this.dataAccess.setModal("Success", "success");
    $("#info-model").modal("toggle");
  }

}
