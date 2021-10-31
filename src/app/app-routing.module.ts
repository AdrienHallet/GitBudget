import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryDashboardComponent} from './components/category/category-dashboard.component';
import {TransactionDashboardComponent} from './components/transaction/transaction-dashboard.component';
import {LandingComponent} from './components/landing/landing.component';
import {AuthenticationService} from './core/auth/authentication.service';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'transactions', component: TransactionDashboardComponent, canActivate: [AuthenticationService]},
  { path: 'categories', component: CategoryDashboardComponent, canActivate: [AuthenticationService]},

  // Redirect unknown to landing page
  { path: '*', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
