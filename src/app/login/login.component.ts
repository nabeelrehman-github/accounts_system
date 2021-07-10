import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataAccessService } from '../data-access.service';
import { LoginRequest } from '../models/request/LoginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: LoginRequest = new LoginRequest();
  isInvalid = false;

  constructor(
    private dataService: DataAccessService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  closePopup() {
    this.isInvalid = false;
  }

  attemptLogin() {
    console.log(this.user)
    if (this.user.username == "admin" && this.user.password == "admin") {
      this.dataService.setAuthentication(true)
      this.router.navigate(['./stock_details']);
    } else {
      this.isInvalid = true;
    }
  }

}
