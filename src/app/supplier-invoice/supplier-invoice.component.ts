import { Component, OnInit } from '@angular/core';
import { InvoiceItemRequest, SaveInvoiceRequest } from '../models/invoice-request';
import { InvoiceItem } from '../models/InvoiceItem';
import { Customers, PaymentType, PrefetchResponse, ProductDetails } from '../models/prefetch-response';
import { StatusCode } from '../models/status-codes';
import { DataAccessService } from '../services/data_access/data-access.service';
declare var $: any;

@Component({
  selector: 'app-supplier-invoice',
  templateUrl: './supplier-invoice.component.html',
  styleUrls: ['./supplier-invoice.component.css']
})
export class SupplierInvoiceComponent implements OnInit {
  invoiceRequest: SaveInvoiceRequest = new SaveInvoiceRequest();

  invoiceDate: number = Date.now();

  allowSubmit: boolean = false;
  itemList: Array<InvoiceItem> = [];

  selectedCompany: number;
  selectedModel: number;
  selectedPayment: number;
  selectedCustomer: number;

  miscCharges: number = 100;
  miscDesc: string = 'Acid and Charging';

  quantity!: number;
  price!: number;
  subtotal: number = 0;
  tax: number = 100;
  total: number = 0;

  models: ProductDetails.Models[];
  customerType: Customers[];
  testModels1: ProductDetails.Models[] = [
    { id: 3, productId: 'MR35 Volta Fujika' }
  ];
  testModels2: ProductDetails.Models[] = [
    { id: 1, productId: 'MF35 GEN' }
  ];

  companies: ProductDetails.Companies[] = [
    { id: 1, companyName: 'Osaka', models: this.testModels1 },
    { id: 2, companyName: 'Exide', models: this.testModels2 }
  ];

  products: ProductDetails.Products[] = [
    { companies: this.companies },
  ]

  customers: Customers[] = [
    { id: 1, customerName: 'Zubair', phNumber: '03001234567', customerType: 1 },
    { id: 2, customerName: 'Ali', phNumber: '03001234567', customerType: 2 }
  ]

  paymentType: PaymentType[] = [
    { id: 1, name: 'Cash' },
    { id: 2, name: 'Bank' },
    { id: 3, name: 'Lease' }
  ]

  prefetchData: PrefetchResponse = {
    products: this.products,
    customers: this.customers,
    paymentType: this.paymentType
  }

  constructor(
    public dataAccess: DataAccessService) {
    this.customerType = this.customers.filter(i => {
      return (i.customerType == 2);
    })
  }

  ngOnInit(): void {
  }

  addToList() {
    if (this.selectedCompany != null && this.selectedModel != null && this.quantity != null && this.quantity.toString().trim().replace(" ", "") != "") {
      let item: InvoiceItem = new InvoiceItem();

      this.companies.forEach((i) => {
        if (i.id == this.selectedCompany) {
          item.company = i.companyName;
        }
      });

      this.models.forEach((i) => {
        if (i.id = this.selectedModel) {
          item.model = i.productId;
          item.rate = this.price;
          item.subtotal = this.price * this.quantity;
        } else return;
      });

      item.quantity = this.quantity;
      this.itemList.push(item);
      this.calculateSummary()


      this.clearFields();
      // Show Modal
      // this.dataAccess.setModal("Invalid Fields.", "danger");
      // $("#info-model").modal("toggle");
    }
  }

  clearFields() {
    this.selectedCompany = null;
    this.selectedModel = null;
    this.quantity = null;
    this.price = null;
  }

  allowNumberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getRow(companyId, modelId, itemQuantity) {

    this.companies.forEach((i) => {
      if (i.id == companyId)
        this.selectedCompany = companyId;
    })

    this.models.forEach((i) => {
      if (i.id == modelId)
        this.selectedModel = modelId;
    })

    this.quantity = itemQuantity;
  }

  removeItem(index) {
    if (index > -1) {
      this.itemList.splice(index, 1);
      this.calculateSummary()
    }
  }

  calculateSummary() {
    this.subtotal = 0;

    this.itemList.forEach((i) => {
      this.subtotal += i.subtotal;
    })
    this.total = this.subtotal > 0 ? this.subtotal + this.tax : 0;
  }

  generateInvoice() {
    if (this.itemList.length > 0 && this.selectedCustomer != null && this.selectedPayment != null) {
      this.calculateSummary(); // Calculate Total.
      this.invoiceRequest.amount = this.total; // Subtotal.
      this.invoiceRequest.paymentType = this.selectedPayment; // Selected Payment Type.
      this.invoiceRequest.customerId = this.selectedCustomer; // Selected Customer Type.
      this.invoiceRequest.misc_amount = this.miscCharges;
      this.invoiceRequest.misc_desc = this.miscDesc;

      let invoiceRequestItemList: InvoiceItemRequest[] = [];

      // Converting InvoiceItem to InvoiceItemRequest
      this.itemList.forEach(item => {
        let invoiceRequestItem: InvoiceItemRequest = new InvoiceItemRequest();

        invoiceRequestItem.companyId = item.companyId;
        invoiceRequestItem.price = item.rate;
        invoiceRequestItem.productId = item.model;
        invoiceRequestItem.quantity = item.quantity;

        invoiceRequestItemList.push(invoiceRequestItem);
      });

      this.invoiceRequest.invoiceDetails = invoiceRequestItemList;

      this.dataAccess.callSaveSupplierInvoice(this.invoiceRequest).subscribe(
        res => {
          if (res.statusCode == StatusCode.SUCCESS_CODE) {
            // Show Modal
            this.dataAccess.setModal("Purchase Successful", "success");
            $("#info-model").modal("toggle");
          }
        }
      );
    }
  }

  onChangeCompany() {
    this.models = this.companies.find(i => i.id == this.selectedCompany).models
  }

  // validateFields(event: any) {
  //   console.log(this.allowSubmit);
  //   let id = (event.target as Element).id;
  //   switch (id) {
  //     case 'selectedQuantity':
  //       if (!/^\d+$/.test(this.quantity.toString()))
  //         this.allowSubmit = true;
  //       break;

  //     default:
  //       break;
  //   }
  //   console.log(this.allowSubmit);
  // }

}
