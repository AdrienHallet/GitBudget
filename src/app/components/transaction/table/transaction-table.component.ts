import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {
  Transaction,
  TRANSACTION_CATEGORY_ID,
  TRANSACTION_DATE,
  TRANSACTION_ID,
  TRANSACTION_NAME,
  TRANSACTION_VALUE
} from '../../../core/models/transaction.model';
import {TransactionService} from '../../../core/data/transaction.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {ID} from '../../../core/models/app-data.model';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html'
})
export class TransactionTableComponent implements OnInit, OnDestroy {

  transactions$: Observable<Transaction[]>;
  transactionCount: Observable<number>;
  isFormVisible = false;

  @Output()
  addTransaction: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  unselectTransaction: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  selectTransaction: EventEmitter<Transaction> = new EventEmitter<Transaction>();

  selectedTransaction: Transaction | undefined;

  readonly TRANSACTION_ID = TRANSACTION_ID;
  readonly TRANSACTION_VALUE = TRANSACTION_VALUE;
  readonly TRANSACTION_NAME = TRANSACTION_NAME;
  readonly TRANSACTION_DATE = TRANSACTION_DATE;
  readonly TRANSACTION_CATEGORY_ID = TRANSACTION_CATEGORY_ID;

  private currentPageSize: number;
  private currentPage: number;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private transactionService: TransactionService,
  ) {
  }

  ngOnInit(): void {
    this.initRefreshSubscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  onPageRequest($event: any): void {
    console.log($event);
    const pageSize = $event.rows;
    const first = $event.first;
    this.loadTransactions(pageSize, first / pageSize);
  }

  onAdd(): void {
    this.addTransaction.next();
  }

  onRowSelect($event: any): void {
    this.selectTransaction.next($event.data as Transaction);
  }

  onRowUnselect(): void {
    this.unselectTransaction.next();
  }

  private loadTransactions(pageSize: number, page: number): void {
    this.currentPageSize = pageSize;
    this.currentPage = page;
    // Todo check unsubscribe
    this.transactions$ = this.transactionService.getPage(pageSize, page).pipe(
      tap(data => {
        if (this.selectedTransaction != null) {
          this.selectedTransaction = data.find(transaction =>
            transaction[ID] === (this.selectedTransaction ? this.selectedTransaction[ID] : null));
        }
      }),
    );
    this.transactionCount = this.transactionService.count();
  }

  private initRefreshSubscribe(): void {
    this.transactionService.observeChange().pipe(
      takeUntil(this.onDestroy$),
      tap(() => this.loadTransactions(this.currentPageSize, this.currentPage)),
    ).subscribe();
  }
}
