import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TransactionListComponent} from './components/transaction/list/transaction-list.component';
import {CategoryDashboardComponent} from './components/category/category-dashboard.component';
import {TransactionTableComponent} from './components/transaction/table/transaction-table.component';

const routes: Routes = [
  { path: 'transactions', component: TransactionTableComponent},
  { path: 'categories', component: CategoryDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
