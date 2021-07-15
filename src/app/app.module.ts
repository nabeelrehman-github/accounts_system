import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { AddStockItemComponent } from './add-stock-item/add-stock-item.component';
import { SalesWindowComponent } from './sales-window/sales-window.component';
import { CustomerInvoiceComponent } from './invoice/invoice.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AddUpdateCompaniesComponent } from './add-update-companies/add-update-companies.component';
import { AuthGuard } from './services/authentication/auth.guard';
import { SupplierInvoiceComponent } from './supplier-invoice/supplier-invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StockDetailsComponent,
    AddStockItemComponent,
    SalesWindowComponent,
    CustomerInvoiceComponent,
    AddUpdateCompaniesComponent,
    SupplierInvoiceComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgSelectModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
