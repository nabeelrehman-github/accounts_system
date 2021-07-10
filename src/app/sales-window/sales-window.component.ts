import { Component, OnInit } from '@angular/core';
import { DataAccessService } from '../data-access.service';
import { ProductInvoice } from '../models/invoiceProducts';
declare var $: any;

@Component({
  selector: 'app-sales-window',
  templateUrl: './sales-window.component.html',
  styleUrls: ['./sales-window.component.css']
})

export class SalesWindowComponent implements OnInit {

  grossPrice: number = 0;
  netPrice: number = 0;
  discount: number = 0;
  cashReceived: number = 0;
  cashChange: number = 0;

  showSearch = "";

  productList: Array<ProductInvoice> = [
    { id: "PL-101", name: "Olpers Milk Pack", salesPrice: 75.00, quantity: 1 },
    { id: "PL-102", name: "Eggs", salesPrice: 230.00, quantity: 1 },
    { id: "PL-103", name: "Coca Cola 1.5 ltr", salesPrice: 100.00, quantity: 1 },
    { id: "PL-104", name: "Sprite 1.5 ltr", salesPrice: 100.00, quantity: 1 },
    { id: "PL-105", name: "Sooper Small", salesPrice: 10.00, quantity: 1 },
    { id: "PL-106", name: "Dairy Milk", salesPrice: 200.00, quantity: 1 },
    { id: "PL-107", name: "Bread Milky Medium", salesPrice: 120.00, quantity: 1 }
  ];
  // quantityHash = new Map<string, string>([
  //   ["PL-101", ""]
  // ])

  constructor(public dataAccess: DataAccessService) { }

  ngOnInit(): void {
    this.calculatePrice();
  }

  addProductToCart() {

  }

  onValueChanged(event: any, index: number) {
    this.productList[index].quantity = parseInt(event.target.value);
    this.calculatePrice();
  }

  increaseQuantity(index: number) {
    this.productList[index].quantity += 1;
    this.calculatePrice();
  }

  decreseQuantity(index: number) {
    if (this.productList[index].quantity != 1)
      this.productList[index].quantity -= 1;
    this.calculatePrice();
  }

  calculatePrice() {
    this.grossPrice = 0;
    this.productList.forEach(p => {
      this.grossPrice += p.quantity * p.salesPrice
    });

    this.calculateNetPrice();

    if (this.cashReceived.toString() == "")
      this.cashReceived = 0
    if (this.cashReceived != 0)
      this.cashChange = this.cashReceived - this.netPrice; // Calculate Change.
    else
      this.cashChange = 0;
  }

  calculateNetPrice() {
    this.netPrice = this.grossPrice - this.discount;
  }

  calculateDiscount(value: any) {
    this.discount = value.target.value;
    this.calculatePrice()
  }

  calculateCashReceived(value: any) {
    this.cashReceived = value.target.value;
    if (this.cashReceived.toString() == "")
      this.cashReceived = 0
    if (this.cashReceived != 0)
      this.cashChange = this.cashReceived - this.netPrice;
    else
      this.cashChange = 0;
  }

  toggleSearchDropDown() {
    this.showSearch === "" ? this.showSearch = "show" : this.showSearch = "";
  }

  submit() {
    this.dataAccess.setModal("Checkout Successfull", "success");
    $("#info-model").modal("toggle");
  }

}
