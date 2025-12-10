import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { CustomersComponent } from './features/customers/customers.component';
import { AccountsComponent } from './features/accounts/accounts.component';
import { LoansComponent } from './features/loans/loans.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'loans', component: LoansComponent },
  { path: '**', redirectTo: '' }
];
