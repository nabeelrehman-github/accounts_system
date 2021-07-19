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
import { AddUpdateCustomersComponent } from './add-update-customers/add-update-customers.component';
import { AdjustPaymentComponent } from './adjust-payment/adjust-payment.component';
import { CustomersRecordComponent } from './customers-record/customers-record.component';
import { InvoiceSummariesComponent } from './invoice-summaries/invoice-summaries.component';
import { ThermalPrintModule } from 'ng-thermal-print';
import { InvoiceReceiptComponent } from './invoice-receipt/invoice-receipt.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { HeadsDetailComponent } from './heads-detail/heads-detail.component';
import { AddUpdateExpenseComponent } from './add-update-expense/add-update-expense.component';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { AddProductComponent } from './add-product/add-product.component';

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
    AddUpdateCustomersComponent,
    AdjustPaymentComponent,
    CustomersRecordComponent,
    InvoiceSummariesComponent,
    InvoiceReceiptComponent,
    InvoiceDetailsComponent,
    HeadsDetailComponent,
    AddUpdateExpenseComponent,
    ExpenseDetailsComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgSelectModule,
    ThermalPrintModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
