import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStockItemComponent } from './add-stock-item/add-stock-item.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LoginComponent } from './login/login.component';
import { SalesWindowComponent } from './sales-window/sales-window.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'stock_details', component: StockDetailsComponent},
  {path: 'add_stock_item', component: AddStockItemComponent},
  {path: 'sales_window', component: SalesWindowComponent},
  {path: 'invoice', component: InvoiceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
