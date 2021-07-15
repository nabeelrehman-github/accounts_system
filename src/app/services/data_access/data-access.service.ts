import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AddUpdateEntry } from 'src/app/models/add-update-entry';
import { SaveInvoiceRequest } from 'src/app/models/invoice-request';
import { InvoiceResponse } from 'src/app/models/invoice-response';
import { LoginRequest } from 'src/app/models/login/login-request';
import { LoginResponse } from 'src/app/models/response/login-response';
import { UtilityService } from '../utility.service';



@Injectable({
  providedIn: 'root'
})

export class DataAccessService {

  private BASE_URL = 'http://124.109.34.237:8083/retail_shop/';

  private API_AUTHENTICATE = this.BASE_URL + 'user/authenticate';
  private API_SAVE_SELLER_INVOICE = this.BASE_URL + 'invoice/seller/save';
  private API_SAVE_SUPPLIER_INVOICE = this.BASE_URL + 'invoice/supplier/save';

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
