import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DataAccessService {

  BASE_URL = 'http://localhost:8082/alfarays/';

  login = this.BASE_URL + 'login';

  authSubject = new Subject<boolean>();
  modalMessageSubject = new Subject<string>();
  modalTypeSubject = new Subject<string>();
  constructor(private http: HttpClient) { }

  // authorizeLogin(user:LoginRequest):Observable<LoginResponse> {
  //   return this.http.post<LoginResponse>(this.LOGIN,user);
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

  setAuthentication(data: boolean) {
    this.authSubject.next(data);
  }

  getAuthentication(): Observable<boolean> {
    return this.authSubject.asObservable();
  }

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
}
