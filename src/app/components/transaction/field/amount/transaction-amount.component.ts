import {Component, Input} from '@angular/core';
import {Transaction} from '../../../../core/models/transaction.model';
import {TransactionService} from '../../../../core/data/transaction.service';
import * as currency from 'currency.js';

@Component({
  selector: 'app-transaction-amount',
  templateUrl: './transaction-amount.component.html'
})
export class TransactionAmountComponent {

  constructor(
    private transactionService: TransactionService,
  ) {
  }

  @Input()
  transaction: Transaction;

  onChange($event: any) {
    this.transaction.value = currency($event.target.value).toJSON();
    this.transactionService.update(this.transaction);
  }
}
