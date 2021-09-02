import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryDashboardComponent} from './components/category/category-dashboard.component';
import {TransactionDashboardComponent} from './components/transaction/transaction-dashboard.component';

const routes: Routes = [
  { path: 'transactions', component: TransactionDashboardComponent},
  { path: 'categories', component: CategoryDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
