import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStockItemComponent } from './add-stock-item/add-stock-item.component';
import { AddUpdateCompaniesComponent } from './add-update-companies/add-update-companies.component';
import { CustomerInvoiceComponent } from './invoice/invoice.component';
import { LoginComponent } from './login/login.component';
import { SalesWindowComponent } from './sales-window/sales-window.component';
import { AuthGuard } from './services/authentication/auth.guard';
import { LoginRedirectionGuard } from './services/authentication/login-redirection.guard';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { SupplierInvoiceComponent } from './supplier-invoice/supplier-invoice.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoginRedirectionGuard]  },
  { path: 'login', component: LoginComponent, canActivate: [LoginRedirectionGuard] },
  { path: 'stock_details', component: StockDetailsComponent, canActivate:[AuthGuard]},
  { path: 'add_stock_item', component: AddStockItemComponent, canActivate:[AuthGuard]},
  { path: 'sales_window', component: SalesWindowComponent, canActivate:[AuthGuard] },
  { path: 'customer_invoice', component: CustomerInvoiceComponent, canActivate:[AuthGuard] },
  { path: 'supplier_invoice', component: SupplierInvoiceComponent, canActivate: [AuthGuard]},
  { path: 'add_update_company', component: AddUpdateCompaniesComponent, canActivate:[AuthGuard]},
  { path: '**' , redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
