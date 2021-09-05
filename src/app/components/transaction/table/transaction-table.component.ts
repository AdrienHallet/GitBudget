import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  Transaction,
  TRANSACTION_CATEGORY_ID,
  TRANSACTION_DATE,
  TRANSACTION_ID,
  TRANSACTION_NAME,
  TRANSACTION_VALUE
} from '../../../core/models/transaction.model';
import {TransactionService} from '../../../core/data/transaction.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html'
})
export class TransactionTableComponent implements OnInit {

  transactions$: Observable<Transaction[]>;
  transactionCount: Observable<number>;
  isFormVisible = false;

  @Output()
  unselectTransaction: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  selectTransaction: EventEmitter<Transaction> = new EventEmitter<Transaction>();

  readonly TRANSACTION_ID = TRANSACTION_ID;
  readonly TRANSACTION_VALUE = TRANSACTION_VALUE;
  readonly TRANSACTION_NAME = TRANSACTION_NAME;
  readonly TRANSACTION_DATE = TRANSACTION_DATE;
  readonly TRANSACTION_CATEGORY_ID = TRANSACTION_CATEGORY_ID;

  constructor(
    private transactionService: TransactionService,
  ) {
  }

  ngOnInit(): void {
  }

  private loadTransactions(pageSize: number, page: number): void {
    // Todo check unsubscribe
    this.transactions$ = this.transactionService.getPage(pageSize, page).pipe(tap(data => console.log(data)));
    this.transactionCount = this.transactionService.count();
  }

  onPageRequest($event: any): void {
    console.log($event);
    const pageSize = $event.rows;
    const first = $event.first;
    this.loadTransactions(pageSize, first / pageSize);
  }

  onRowSelect($event: any): void {
    this.selectTransaction.next($event.data as Transaction);
  }

  onRowUnselect(): void {
    this.unselectTransaction.next();
  }
}
