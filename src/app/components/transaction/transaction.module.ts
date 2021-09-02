import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {TransactionTableComponent} from './table/transaction-table.component';
import {TransactionDashboardComponent} from './transaction-dashboard.component';
import {TransactionFormComponent} from './form/transaction-form.component';

@NgModule({
  declarations: [
    TransactionDashboardComponent,
    TransactionFormComponent,
    TransactionTableComponent,
  ],
  imports: [
      SharedModule,
      FormsModule,
  ],
  exports: [
    TransactionDashboardComponent
  ],
})
export class TransactionModule {
  constructor() {
  }
}
