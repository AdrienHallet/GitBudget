import {Component, OnInit} from '@angular/core';
import {Transaction} from '../../../core/models/transaction.model';
import {TransactionService} from '../../../core/data/transaction.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {

  transactions$: Observable<Transaction[]>;
  transactionCount: Observable<number>;

  constructor(
    private transactionService: TransactionService,
  ) {
  }

  ngOnInit(): void {
    this.initTransactions();
  }

  private initTransactions(): void {
    this.transactions$ = this.transactionService.getPage(10, 100);
    this.transactionCount = this.transactionService.count();
  }

  trackByFn(index: number, transaction: Transaction): number {
    return transaction.id;
  }
}
