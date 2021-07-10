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
import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StockDetailsComponent,
    AddStockItemComponent,
    SalesWindowComponent,
    InvoiceComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
