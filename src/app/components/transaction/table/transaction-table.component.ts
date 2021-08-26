import {Component, OnInit} from '@angular/core';
import {Transaction} from '../../../core/models/transaction.model';
import {TransactionService} from '../../../core/data/transaction.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html'
})
export class TransactionTableComponent implements OnInit {

  transactions$: Observable<Transaction[]>;
  transactionCount: Observable<number>;

  constructor(
    private transactionService: TransactionService,
  ) {
  }

  ngOnInit(): void {
  }

  private loadTransactions(pageSize: number, page: number): void {
    // Todo check unsubscribe
    this.transactions$ = this.transactionService.getPage(pageSize, page);
    this.transactionCount = this.transactionService.count();
  }

  onPageRequest($event: any): void {
    console.log($event);
    const pageSize = $event.rows;
    const first = $event.first;
    this.loadTransactions(pageSize, first / pageSize);
  }
}
