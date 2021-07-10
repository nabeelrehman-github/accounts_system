import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataAccessService } from './data-access.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'accounts-system';
  textClass = "text-primary";
  modalMessage = "";
  isAuthenticated = true

  constructor(private router: Router, private dataAccess: DataAccessService) {
    this.dataAccess.getAuthentication().subscribe(
      res => {
        this.isAuthenticated = res;
      }
    )

    this.dataAccess.getModalMessage().subscribe(
      res => {
        this.modalMessage = res;
      }
    )

    this.dataAccess.getModalType().subscribe(
      res => {
        this.textClass = "text-" + res;
      }
    )
  }

  login() {
    this.router.navigate(['login']);
  }

  logout() {
    this.isAuthenticated = false;
    this.dataAccess.setAuthentication(false);
    this.router.navigate(['']);
  }
}
