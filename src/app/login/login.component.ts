import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../models/login/login-request';
import { LoginResponse } from '../models/response/login-response';
import { StatusCode } from '../models/status-codes';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { DataAccessService } from '../services/data_access/data-access.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loginRequest: LoginRequest = new LoginRequest();
  isInvalid = false;

  loggedUser: LoginResponse.ProfileData;

  profileData: LoginResponse.ProfileData[] = [
    { firstName: 'Nabeel', lastName: 'Rehman', branchName: 'Main Branch', branchId: 1, userName: 'nabeel', userRole: 'user' },
    { firstName: 'Muneeb', lastName: 'Rehman', branchName: 'Main Branch', branchId: 1, userName: 'mrehman', userRole: 'admin' }
  ]

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private dataAccessService: DataAccessService,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
  }

  closePopup() {
    this.isInvalid = false;
  }

  attemptLogin() {
    this.loginRequest.userName = this.username;
    this.loginRequest.password = this.password;

    if(this.loginRequest.userName != null && this.loginRequest.password != null && this.loginRequest.userName != '' && this.loginRequest.password != ''){
      console.log('attempting login')
      this.dataAccessService.authorizeLogin(this.loginRequest).subscribe(
        res => {
          console.log(res.statusCode)
          if(res.statusCode == StatusCode.SUCCESS_CODE){
            this.loggedUser = res.data;
            
            this.authService.setLoggedUser(this.loggedUser);
            this.authService.setAuthentication(true);
            this.authService.setRole(this.loggedUser.userRole);

            this.utilityService.setBranch(this.loggedUser.branchId);
            this.utilityService.setUsername(this.loggedUser.userName);
            this.utilityService.setReceipt(false);
            console.log(this.utilityService.getReceipt())

            this.router.navigate(['customer_invoice']);
          } else if (res.statusCode == StatusCode.AUTH_FAILURE){
            this.isInvalid = true;
          }
        }
      );
    } else {
      this.isInvalid = true;
    }
  }
}
