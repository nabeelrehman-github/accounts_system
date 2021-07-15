import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { LoginResponse } from './models/response/login-response';
import { AuthenticationService } from './services/authentication/authentication.service';
import { DataAccessService } from './services/data_access/data-access.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'accounts-system';
  textClass = "text-primary";
  modalMessage = "";
  isAuthenticated: boolean;
  loggedUser: LoginResponse.ProfileData;
  loggedUserRole: string;

  constructor(
    private router: Router,
    private dataAccess: DataAccessService,
    private authService: AuthenticationService) {

    // handles login/logout button behaviour.
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationStart)) { // If page is refreshed i.e. not redirected from any other page.
        this.authService.isLoggedIn().subscribe(
          res => {
            if (res) {
              this.isAuthenticated = res;
            }
          } 
        )
        this.authService.getRole().subscribe(
          res => {
            this.loggedUserRole = res;
          }
        )
      }
    });

    this.authService.getRole().subscribe(
      res => {
        this.loggedUserRole = res;
      }
    )

    this.authService.isLoggedIn().subscribe(
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

  log() { // Login / Logout function.
    if (this.isAuthenticated) { // If Login is pressed.
      this.isAuthenticated = false;
      this.authService.setAuthentication(false);
      this.router.navigate(['']);
    } else { // If Logout is pressed.
      this.authService.logout();
      this.router.navigate(['login']);

    }
  }

  logoRedirect() {
    if (this.isAuthenticated)
      this.router.navigate(['invoice'])
    else
      this.router.navigate(['login'])
  }
}
