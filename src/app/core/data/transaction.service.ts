import { Injectable } from '@angular/core';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {from, Observable, of} from 'rxjs';
import {DataService} from './data.service';
import {AppTable} from './db/table.enum';
import {Transaction} from '../models/transaction.model';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly TABLE = AppTable.TRANSACTIONS;

  constructor(
    private dataService: DataService,
  ) {}

  public update(transaction: Transaction): Observable<Transaction> {
    return from(this.dataService.update(this.TABLE, transaction.id, transaction)).pipe(
      map(() => transaction),
    );
  }

  create(newItem: Transaction): Observable<Transaction> {
    return from(this.dataService.add(this.TABLE, newItem));
  }

  getAll(): Observable<Transaction[]> {
    return this.dataService.getAll(this.TABLE) as Observable<Transaction[]>;
  }

  getPage(pageSize: number, page: number): Observable<Transaction[]> {
    return this.dataService.getPage(this.TABLE, pageSize, page) as Observable<Transaction[]>;
  }

  count(): Observable<number> {
    return this.dataService.count(this.TABLE);
  }
}
