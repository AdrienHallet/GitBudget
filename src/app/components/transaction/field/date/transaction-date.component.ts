import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from '../../../../core/models/transaction.model';
import {TransactionService} from '../../../../core/data/transaction.service';
import * as currency from 'currency.js';
import {CategoryService} from '../../../../core/data/category.service';
import {Observable} from 'rxjs';
import {Category} from '../../../../core/models/category.model';

@Component({
  selector: 'app-transaction-date',
  templateUrl: './transaction-date.component.html'
})
export class TransactionDateComponent implements OnInit {

  @Input()
  transaction: Transaction;

  categories$: Observable<Category[]>;

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

  private initCategories(): void {
    this.categories$ = this.categoryService.getAll();
  }
}
