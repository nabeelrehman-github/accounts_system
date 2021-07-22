import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AddStockItemComponent } from './add-stock-item/add-stock-item.component';
import { AddUpdateCompaniesComponent } from './add-update-companies/add-update-companies.component';
import { AddUpdateCustomersComponent } from './add-update-customers/add-update-customers.component';
import { AddUpdateExpenseComponent } from './add-update-expense/add-update-expense.component';
import { AdjustPaymentComponent } from './adjust-payment/adjust-payment.component';
import { AdminRouteGuard } from './admin-route.guard';
import { CustomersRecordComponent } from './customers-record/customers-record.component';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { HeadsDetailComponent } from './heads-detail/heads-detail.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceReceiptComponent } from './invoice-receipt/invoice-receipt.component';
import { InvoiceSummariesComponent } from './invoice-summaries/invoice-summaries.component';
import { CustomerInvoiceComponent } from './invoice/invoice.component';
import { LoginComponent } from './login/login.component';
import { SalesWindowComponent } from './sales-window/sales-window.component';
import { AuthGuard } from './services/authentication/auth.guard';
import { LoginRedirectionGuard } from './services/authentication/login-redirection.guard';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { SupplierInvoiceComponent } from './supplier-invoice/supplier-invoice.component';
import { UpdateInventoryComponent } from './update-inventory/update-inventory.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoginRedirectionGuard]  },
  { path: 'login', component: LoginComponent, canActivate: [LoginRedirectionGuard] },
  { path: 'stock_details', component: StockDetailsComponent, canActivate:[AuthGuard]},
  { path: 'add_stock_item', component: AddStockItemComponent, canActivate:[AuthGuard, AdminRouteGuard]},
  { path: 'customer_invoice', component: CustomerInvoiceComponent, canActivate:[AuthGuard] },
  { path: 'supplier_invoice', component: SupplierInvoiceComponent, canActivate: [AuthGuard]},
  { path: 'add_update_company', component: AddUpdateCompaniesComponent, canActivate:[AuthGuard, AdminRouteGuard]},
  { path: 'add_update_customers', component: AddUpdateCustomersComponent, canActivate:[AuthGuard, AdminRouteGuard]},
  { path: 'adjustment_payment', component: AdjustPaymentComponent, canActivate:[AuthGuard]},
  { path: 'customer_record', component: CustomersRecordComponent, canActivate:[AuthGuard]},
  { path: 'invoice_summaries', component: InvoiceSummariesComponent, canActivate:[AuthGuard]},
  { path: 'invoice_receipt', component: InvoiceReceiptComponent, canActivate:[AuthGuard]},
  { path: 'invoice_summaries/details/:id', component: InvoiceDetailsComponent, canActivate:[AuthGuard]},
  { path: 'head_details', component: HeadsDetailComponent, canActivate:[AuthGuard, AdminRouteGuard]},
  { path: 'expense_details', component: ExpenseDetailsComponent, canActivate:[AuthGuard, AdminRouteGuard]},
  { path: 'add_expense', component: AddUpdateExpenseComponent, canActivate:[AuthGuard]},
  { path: 'add_product', component: AddProductComponent, canActivate:[AuthGuard,  AdminRouteGuard]},
  { path: 'update_inventory', component: UpdateInventoryComponent, canActivate:[AuthGuard]},
  { path: '**' , redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
