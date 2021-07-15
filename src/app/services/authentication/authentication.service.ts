import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { LoginResponse } from 'src/app/models/response/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authSubject = new Subject<boolean>();
  loggedUseRole = new BehaviorSubject<LoginResponse.ProfileData>(null);
  role = new BehaviorSubject<string>(null);

  setAuthentication(data: boolean) {
    sessionStorage.setItem('auth', data ? 'true' : 'false');
    this.authSubject.next(data);
  }

  setRole(data: string) {
    sessionStorage.setItem('role', data);
    this.role.next(data);
  }

  getRole(): Observable<string>{
    this.role.next(sessionStorage.getItem('role'))
    return this.role.asObservable();
  }

  setLoggedUser(data: LoginResponse.ProfileData) {
    this.loggedUseRole.next(data);
  }

  getLoggedUser(): Observable<LoginResponse.ProfileData> {
    return this.loggedUseRole.asObservable();
  }

  isLoggedIn(): Observable<boolean> {
    this.authSubject.next(sessionStorage.getItem('auth') == 'true') // Getting auth storen in session and storing in subject.
    return this.authSubject.asObservable();
  }

  getAuthSession() {
    return sessionStorage.getItem('auth');
  }

  logout() {
    sessionStorage.removeItem('auth');
    this.authSubject.next(false);
  }
}
