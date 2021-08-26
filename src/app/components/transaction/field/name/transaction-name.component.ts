import {Component, Input} from '@angular/core';
import {Transaction} from '../../../../core/models/transaction.model';
import {TransactionService} from '../../../../core/data/transaction.service';
import * as currency from 'currency.js';

@Component({
  selector: 'app-transaction-name',
  templateUrl: './transaction-name.component.html'
})
export class TransactionNameComponent {

  constructor(
    private transactionService: TransactionService,
  ) {
  }

  @Input()
  transaction: Transaction;

  onChange($event: any): void {
    this.transaction.name = $event.target.value;
    this.transactionService.update(this.transaction);
  }
}
