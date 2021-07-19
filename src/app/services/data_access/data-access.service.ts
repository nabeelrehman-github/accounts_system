import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AddExpenseRequest } from 'src/app/models/add-expense-request';
import { AddProductRequest } from 'src/app/models/add-product-request';
import { AddUpdateEntry } from 'src/app/models/add-update-entry';
import { AdjustAmountRequest } from 'src/app/models/adjust-amount-request';
import { CustomerRecordResponse } from 'src/app/models/customer-record-response';
import { ExpenseDetailsResponse } from 'src/app/models/expense-details-response';
import { HeadDetailsResponse } from 'src/app/models/head-details-response';
import { InventoryDetailsResponse } from 'src/app/models/inventory-details';
import { InvoiceDetailsRequest } from 'src/app/models/invoice-details-request';
import { InvoiceSummaryDetailsResponse } from 'src/app/models/invoice-details-response';
import { SaveInvoiceRequest } from 'src/app/models/invoice-request';
import { InvoiceResponse } from 'src/app/models/invoice-response';
import { InvoiceSummariesRequest } from 'src/app/models/invoice-summaries-request';
import { InvoiceSummariesResponse } from 'src/app/models/invoice-summaries-response';
import { LoginRequest } from 'src/app/models/login/login-request';
import { PrefetchResponse } from 'src/app/models/prefetch-response';
import { BaseResponse } from 'src/app/models/response/base-response';
import { LoginResponse } from 'src/app/models/response/login-response';
import { UtilityService } from '../utility.service';



@Injectable({
  providedIn: 'root'
})

export class DataAccessService {

  private BASE_URL = 'http://142.11.243.145:8083/retail_shop/';

  private API_AUTHENTICATE = this.BASE_URL + 'user/authenticate';
  private API_SAVE_SELLER_INVOICE = this.BASE_URL + 'invoice/seller/save';
  private API_SAVE_SUPPLIER_INVOICE = this.BASE_URL + 'invoice/supplier/save';
  private API_ADJUST_PAYMENT = this.BASE_URL + 'invoice/adjustment';
  private API_PREFETCH_DATA = this.BASE_URL + 'general/prefetch/data';
  private API_CUSTOMER_RECORD = this.BASE_URL + 'customer/get';
  private API_INVOICE_SUMMARIES = this.BASE_URL + 'invoice/summary/get';
  private API_INVOICE_DETAILS = this.BASE_URL + 'invoice/detail/get';
  private API_INVENTORY_DETAILS = this.BASE_URL + 'inventory/get';
  private API_HEAD_DETAILS = this.BASE_URL + 'heads/main/get'
  private API_EXPENSE_DETAILS = this.BASE_URL + 'expense/get';
  private API_EXPENSE_ADD = this.BASE_URL + 'expense/add';
  private API_PRODUCT_ADD = this.BASE_URL + 'product/add';

  private modalMessageSubject = new Subject<string>();
  private modalTypeSubject = new Subject<string>();
  private defaultEntry: AddUpdateEntry = { isUpdate: false, entryId: -1, companyName: '', modelName: '', purchasePrice: -1, salesPrice: -1, alreadyInStock: -1, venderName: '' };
  private addUpdateItemSubject = new BehaviorSubject<AddUpdateEntry>(this.defaultEntry); // Defult Value

  headers: any;

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) { }

  // TODO: Need to add Header Interceptor.

  authorizeLogin(user: LoginRequest): Observable<LoginResponse.LoginBaseResponse> {
    return this.http.post<LoginResponse.LoginBaseResponse>(this.API_AUTHENTICATE, user);
  }

  callSaveSellerInvoice(invoice: SaveInvoiceRequest): Observable<InvoiceResponse.SellerInvoiceResponse> {
    this.headers = new HttpHeaders({
      'branchId': this.utilityService.getBranch().toString(),
      'userName': this.utilityService.getUsername()
    });

    return this.http.post<InvoiceResponse.SellerInvoiceResponse>(this.API_SAVE_SELLER_INVOICE, invoice, { headers: this.headers });
  }

  callSaveSupplierInvoice(invoice: SaveInvoiceRequest): Observable<InvoiceResponse.SellerInvoiceResponse> {
    this.headers = new HttpHeaders({
      'branchId': this.utilityService.getBranch().toString(),
      'userName': this.utilityService.getUsername()
    });

    return this.http.post<InvoiceResponse.SellerInvoiceResponse>(this.API_SAVE_SUPPLIER_INVOICE, invoice, { headers: this.headers });
  }

  callAdjustAmount(adjustmentRequest: AdjustAmountRequest) {
    this.headers = new HttpHeaders({
      'branchId': this.utilityService.getBranch().toString(),
      'userName': this.utilityService.getUsername()
    });

    return this.http.post<BaseResponse>(this.API_ADJUST_PAYMENT, adjustmentRequest, { headers: this.headers })
  }

  callPrefetchData() {
    this.headers = new HttpHeaders({
      'branchId': this.utilityService.getBranch().toString(),
      'userName': this.utilityService.getUsername()
    });

    return this.http.post<PrefetchResponse>(this.API_PREFETCH_DATA, null, { headers: this.headers });
  }

  callCustomerRecordDetails() {
    this.headers = new HttpHeaders({
      'branchId': this.utilityService.getBranch().toString(),
      'userName': this.utilityService.getUsername()
    });
    return this.http.post<CustomerRecordResponse>(this.API_CUSTOMER_RECORD, null, { headers: this.headers });
  }

  callInvoiceSummariesDetails(request: InvoiceSummariesRequest) {
    this.headers = new HttpHeaders({
      'branchId': this.utilityService.getBranch().toString(),
      'userName': this.utilityService.getUsername()
    });

    return this.http.post<InvoiceSummariesResponse>(this.API_INVOICE_SUMMARIES, request, { headers: this.headers });
  }

  callInvoiceSummaryDetails(request: InvoiceDetailsRequest){
    this.headers = new HttpHeaders({
      'branchId': this.utilityService.getBranch().toString(),
      'userName': this.utilityService.getUsername()
    });

    return this.http.post<InvoiceSummaryDetailsResponse>(this.API_INVOICE_DETAILS, request, { headers: this.headers });
  }

  callInventoryDetails(){
    this.headers = new HttpHeaders({
      'branchId': this.utilityService.getBranch().toString(),
      'userName': this.utilityService.getUsername()
    });

    return this.http.post<InventoryDetailsResponse>(this.API_INVENTORY_DETAILS, null, { headers: this.headers });
  }

  callMainHeadsDetails(){
    this.headers = new HttpHeaders({
      'branchId': this.utilityService.getBranch().toString(),
      'userName': this.utilityService.getUsername()
    });

    return this.http.post<HeadDetailsResponse>(this.API_HEAD_DETAILS, null, { headers: this.headers });
  }

  callExpenseDetails(){
    this.headers = new HttpHeaders({
      'branchId': this.utilityService.getBranch().toString(),
      'userName': this.utilityService.getUsername()
    });

    return this.http.post<ExpenseDetailsResponse>(this.API_EXPENSE_DETAILS, null, { headers: this.headers });
  }

  callAddExpense(request: AddExpenseRequest){
    this.headers = new HttpHeaders({
      'branchId': this.utilityService.getBranch().toString(),
      'userName': this.utilityService.getUsername()
    });

    return this.http.post<BaseResponse>(this.API_EXPENSE_ADD, request, { headers: this.headers });
  }

  callAddProduct(request: AddProductRequest){
    this.headers = new HttpHeaders({
      'branchId': this.utilityService.getBranch().toString(),
      'userName': this.utilityService.getUsername()
    });

    return this.http.post<BaseResponse>(this.API_PRODUCT_ADD, request, { headers: this.headers });
  }

  // callGetCompanies(){
    
  // }

  // receiptPrefetch():Observable<ReceiptResponseModels.ReceiptResponse>{
  //   return this.http.get<ReceiptResponseModels.ReceiptResponse>
  //     (this.RECEIPT_PREFETCH)
  // }

  // postReceipt(data: ReceiptRequest): any{
  //   return this.http.post(this.POST_RECEIPT, data);
  // }

  // exportReceipt(): any{
  //   return this.http.post(this.EXPORT_RECEIPT, null, { responseType: "blob" });
  // }

  setModal(message: string, type: string) {
    this.modalMessageSubject.next(message);
    this.modalTypeSubject.next(type);
  }

  getModalMessage(): Observable<string> {
    return this.modalMessageSubject.asObservable();
  }
  getModalType(): Observable<string> {
    return this.modalTypeSubject.asObservable();
  }

  setAddUpdateItem(data: AddUpdateEntry) {
    this.addUpdateItemSubject.next(data);
  }

  getAddUpdateItem(): Observable<AddUpdateEntry> {
    return this.addUpdateItemSubject.asObservable();
  }
}
