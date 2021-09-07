import { Injectable } from '@angular/core';
import {map, share, take, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {DataService} from './data.service';
import {AppTable} from './db/table.enum';
import {Transaction} from '../models/transaction.model';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {


  private modified: Subject<void> = new Subject<void>();
  private modified$: Observable<any> = this.modified.asObservable().pipe(share());
  private readonly TABLE = AppTable.TRANSACTIONS;

  constructor(
    private dataService: DataService,
  ) {}

  observeChange(): Observable<void> {
    return this.modified$;
  }

  update(transaction: Transaction): Observable<Transaction> {
    return this.dataService.update(this.TABLE, transaction.id, transaction).pipe(
      take(1),
      tap(() => this.modified.next()),
      map(() => transaction),
    );
  }

  create(newItem: Transaction): Observable<Transaction> {
    return this.dataService.add(this.TABLE, newItem).pipe(
      take(1),
      tap(() => this.modified.next()),
    );
  }

  getAll(): Observable<Transaction[]> {
    return (this.dataService.getAll(this.TABLE) as Observable<Transaction[]>).pipe(
      take(1),
    );
  }

  getPage(pageSize: number, page: number): Observable<Transaction[]> {
    return (this.dataService.getPage(this.TABLE, pageSize, page) as Observable<Transaction[]>).pipe(
      take(1),
    );
  }

  count(): Observable<number> {
    return this.dataService.count(this.TABLE).pipe(
      take(1),
    );
  }
}
