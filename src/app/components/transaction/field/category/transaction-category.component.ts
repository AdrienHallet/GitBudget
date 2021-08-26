import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Transaction} from '../../../../core/models/transaction.model';
import {TransactionService} from '../../../../core/data/transaction.service';
import * as currency from 'currency.js';
import {CategoryService} from '../../../../core/data/category.service';
import {Observable, Subject} from 'rxjs';
import {Category} from '../../../../core/models/category.model';
import {map, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-transaction-category',
  templateUrl: './transaction-category.component.html'
})
export class TransactionCategoryComponent implements OnInit, OnDestroy {

  @Input()
  transaction: Transaction;

  categories: any[];

  private onDestroy$ = new Subject();

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    this.initCategories();
  }

  onChange($event: any): void {
    this.transactionService.update(this.transaction);
  }

  ngOnDestroy(): void {
  }

  private initCategories(): void {
    this.categoryService.getAll().pipe(
      takeUntil(this.onDestroy$),
      map((categories: Category[]) => categories.concat({id: 0, name: 'No category '})),
      tap((data) => this.categories = data as any),
    ).subscribe();
  }
}
