import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  private branchSubject: Subject<number>;
  private usernameSubject: Subject<string>;

  getBranch(){
    // this.branchSubject.next(Number.parseInt(sessionStorage.getItem('branchId')));
    // return this.branchSubject.asObservable();
    return Number.parseInt(sessionStorage.getItem('branchId'));
  }

  setBranch(data: number){
    sessionStorage.setItem('branchId', data.toString());
    //this.branchSubject.next(data);
  }

  getUsername(){
    // this.usernameSubject.next(sessionStorage.getItem('username'));
    // return this.usernameSubject.asObservable();
    return sessionStorage.getItem('username');
  }

  setUsername(data: string){
    sessionStorage.setItem('username', data);
    // this.usernameSubject.next(data);
  }
  
}
