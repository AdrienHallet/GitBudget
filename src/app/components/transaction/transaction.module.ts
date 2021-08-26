import {NgModule} from '@angular/core';
import {TransactionAmountComponent} from './field/amount/transaction-amount.component';
import {TransactionListComponent} from './list/transaction-list.component';
import {SharedModule} from '../../shared/shared.module';
import {TransactionNameComponent} from './field/name/transaction-name.component';
import {TransactionCategoryComponent} from './field/category/transaction-category.component';
import {FormsModule} from '@angular/forms';
import {TransactionDateComponent} from './field/date/transaction-date.component';
import {TransactionTableComponent} from './table/transaction-table.component';


@NgModule({
  declarations: [
    TransactionAmountComponent,
    TransactionNameComponent,
    TransactionCategoryComponent,
    TransactionDateComponent,
    TransactionListComponent,
    TransactionTableComponent,
  ],
    imports: [
        SharedModule,
        FormsModule,
    ],
  exports: [
    TransactionListComponent,
    TransactionTableComponent,
  ],
})
export class TransactionModule {
  constructor() {
  }
}
