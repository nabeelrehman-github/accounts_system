import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CompaniesData } from '../models/companies-response';
import { InvoiceReceipt } from '../models/invoice-receipt';
import { Customers, ProductDetails } from '../models/prefetch-response';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  private branchSubject: Subject<number>;
  private usernameSubject: Subject<string>;
  private receiptSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private invoiceReceipt: BehaviorSubject<InvoiceReceipt> = new BehaviorSubject(null);
  private customersDetailsSubject: BehaviorSubject<Customers[]> = new BehaviorSubject(null);

  getBranch(){
    // this.branchSubject.next(Number.parseInt(localStorage.getItem('branchId')));
    // return this.branchSubject.asObservable();
    return Number.parseInt(localStorage.getItem('branchId'));
  }

  setBranch(data: number){
    localStorage.setItem('branchId', data.toString());
    //this.branchSubject.next(data);
  }

  getUsername(){
    // this.usernameSubject.next(localStorage.getItem('username'));
    // return this.usernameSubject.asObservable();
    return localStorage.getItem('username');
  }

  setUsername(data: string){
    localStorage.setItem('username', data);
    // this.usernameSubject.next(data);
  }

  getReceipt(){
    return localStorage.getItem('receipt') == 'true';
    //  this.receiptSubject.asObservable();
  }

  setReceipt(data: boolean){
    localStorage.setItem('receipt', data ? 'true' : 'false');
    // this.receiptSubject.next(data)
  }

  setInvoiceReceipt(data: InvoiceReceipt){
    localStorage.setItem('invoiceReceipt', JSON.stringify(data))
  }

  getInvoiceReceipt(){
    return JSON.parse(localStorage.getItem('invoiceReceipt'));
  }

  setCustomerDetails(data: Customers[]){
    localStorage.setItem('customerDetails', JSON.stringify(data))
    this.customersDetailsSubject.next(data);
  }

  getCustomerDetails(){
    this.customersDetailsSubject.next(JSON.parse(localStorage.getItem('customerDetails')))
    return this.customersDetailsSubject.asObservable();
  }

  setCompanies(data: CompaniesData[]){
    localStorage.setItem('companies', JSON.stringify(data))
  }

  getCompanies(): CompaniesData[]{
    return JSON.parse(localStorage.getItem('companies'));
  }
  
}
