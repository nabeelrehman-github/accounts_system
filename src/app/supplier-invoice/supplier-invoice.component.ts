import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceReceipt, InvoiceReceiptItem } from '../models/invoice-receipt';
import { InvoiceItemRequest } from '../models/save-supplier-invoice-request';
import { InvoiceItem } from '../models/InvoiceItem';
import { Customers, PrefetchResponseData, ProductDetails } from '../models/prefetch-response';
import { SaveSupplierInvoiceRequest } from '../models/save-supplier-invoice-request';
import { StatusCode } from '../models/status-codes';
import { DataAccessService } from '../services/data_access/data-access.service';
import { UtilityService } from '../services/utility.service';
declare var $: any;

@Component({
  selector: 'app-supplier-invoice',
  templateUrl: './supplier-invoice.component.html',
  styleUrls: ['./supplier-invoice.component.css']
})
export class SupplierInvoiceComponent implements OnInit {
  invoiceReceipt: InvoiceReceipt = new InvoiceReceipt();

  invoiceRequest: SaveSupplierInvoiceRequest = new SaveSupplierInvoiceRequest();
  invoiceDate: number = Date.now();

  allowSubmit: boolean = false;
  itemList: Array<InvoiceItem> = [];

  selectedCompany: number;
  selectedModel: number;
  selectedPayment: number;
  selectedCustomer: number;

  newSupplierName: string;
  newSupplierNumber: string;

  quantity!: number;
  price!: number;
  netTotal: number = 0;
  subtotal: number = 0;
  total: number = 0;
  discount: number = 0;
  minSalePrice = 0;
  maxSalePrice = 0;

  prefetchData: PrefetchResponseData = new PrefetchResponseData();
  companies: ProductDetails.Companies[];
  models: ProductDetails.Models[];
  customerType: Customers[];

  miscCharges: number = 0;
  miscDesc: string = 'Acid and Charging';

  constructor(
    public dataAccess: DataAccessService,
    private router: Router,
    private utilityService: UtilityService) {
    this.dataAccess.callPrefetchData().subscribe(
      res => {
        if (res.statusCode == StatusCode.SUCCESS_CODE) {
          this.prefetchData = res.data;

          this.utilityService.setCustomerDetails(res.data.customers);

          this.customerType = this.prefetchData.customers.filter(i => {
            return (i.customerType == 2);
          })
        }
        else {
          this.dataAccess.setModal("Server not working, try again later.", "danger");
          $("#info-model").modal("toggle");
        }
      }
    );

    this.utilityService.setReceipt(false);
  }

  ngOnInit(): void {
  }

  addToList() {
    if (this.selectedCompany != null && this.selectedModel != null && this.quantity != null && this.quantity.toString().trim().replace(" ", "") != "" && this.selectedPayment != null && this.minSalePrice > 0 && this.maxSalePrice > 0) {
      let item: InvoiceItem = new InvoiceItem();

      this.prefetchData.products.forEach((i) => {
        if (i.id == this.selectedCompany) {
          item.company = i.companyName;
          item.companyId = i.id;
        }
      });

      this.models.forEach((i) => {
        if (i.id == this.selectedModel) {
          item.model = i.value;
          item.rate = this.price;

          item.subtotal = this.price * this.quantity;
        } else return;
      });

      item.maxSalePrice = this.maxSalePrice;
      item.minSalePrice = this.minSalePrice;

      item.quantity = this.quantity;
      this.itemList.push(item);

      console.log(this.selectedModel)


      this.calculateSummary()
      this.clearFields();
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
    if ((!(this.miscCharges === null) && this.miscCharges <= 0) && (!(this.discount === null) && this.discount <= 0)) {
      this.miscCharges = 0;
      this.discount = 0;
    }
    this.subtotal = 0;

    this.itemList.forEach((i) => {
      this.subtotal += i.subtotal;
    })

    this.subtotal = Number(this.subtotal) + ((Number(this.miscCharges) === null || Number(this.miscCharges) == 0) ? 0 : Number(this.miscCharges))

    this.netTotal = this.subtotal;

    if (this.subtotal > 0) {
      this.total = this.subtotal;
      this.total = Number(this.total) - ((Number(this.discount) === null || Number(this.discount) == 0) ? 0 : Number(this.discount))
    }
    else this.total = 0

  }

  confirmPurchase() {
    if (this.itemList.length > 0 && this.selectedPayment != null && this.minSalePrice > 0 && this.maxSalePrice > 0) {
      this.calculateSummary(); // Calculate Total.
      this.invoiceRequest.amount = this.total; // Subtotal.
      this.invoiceRequest.paymentType = this.selectedPayment; // Selected Payment Type.

      // Select customer from drop down.
      if (this.selectedCustomer != null) {
        this.invoiceRequest.customerId = this.selectedCustomer;
      } else { // Select customer from input feilds.
        this.invoiceRequest.customerId = null;
        this.invoiceRequest.customerName = this.newSupplierName;
        this.invoiceRequest.phoneNumber = this.newSupplierNumber;
      }

      this.invoiceRequest.misc_amount = this.miscCharges;
      this.invoiceRequest.misc_desc = this.miscDesc;

      let invoiceRequestItemList: InvoiceItemRequest[] = [];

      this.itemList.forEach(item => {
        let invoiceRequestItem: InvoiceItemRequest = new InvoiceItemRequest();

        invoiceRequestItem.maxSalePrice = item.maxSalePrice;
        invoiceRequestItem.minSalePrice = item.minSalePrice;
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

            this.invoiceReceipt.invoiceNumber = res.data.invoiceNumber;
            this.invoiceReceipt.date = Date.now().toString();
            this.invoiceReceipt.miscCharges = this.miscCharges;
            this.invoiceReceipt.totalBill = this.total

            this.itemList.forEach(item => {
              let invoiceReceiptItem: InvoiceReceiptItem = new InvoiceReceiptItem();
              invoiceReceiptItem.company = item.company;
              invoiceReceiptItem.model = item.model;
              invoiceReceiptItem.quantity = item.quantity;
              invoiceReceiptItem.rate = item.rate;
              invoiceReceiptItem.total = item.subtotal;

              this.invoiceReceipt.invoiceItem.push(invoiceReceiptItem);
            });

            this.utilityService.setInvoiceReceipt(this.invoiceReceipt);
            // console.log(this.invoiceReceipt)
            // console.log(this.utilityService.getInvoiceReceipt())

            // Show Modal
            this.dataAccess.setModal("Purchase Successful", "success");
            $("#info-model").modal("toggle");

            this.utilityService.setReceipt(true);
            this.router.navigate(['invoice_receipt']);
          }
        }
      );
    }
  }

  onChangeCompany() {
    this.models = this.prefetchData.products.find(i => i.id == this.selectedCompany).models
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
