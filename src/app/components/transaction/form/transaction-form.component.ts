import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Category, CATEGORY_ID, CATEGORY_NAME} from '../../../core/models/category.model';
import {CategoryService} from '../../../core/data/category.service';
import {TransactionService} from '../../../core/data/transaction.service';
import {FormGroup} from '@angular/forms';
import {
  Transaction,
  TRANSACTION_CATEGORY_ID,
  TRANSACTION_DATE, TRANSACTION_ID,
  TRANSACTION_NAME,
  TRANSACTION_VALUE
} from '../../../core/models/transaction.model';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html'
})
export class TransactionFormComponent implements OnInit {

  categoryOptions$: Observable<Category[]>;
  transactionForm: FormGroup;
  isCreating: boolean;

  @Output()
  created: EventEmitter<Transaction> = new EventEmitter<Transaction>();
  @Output()
  updated: EventEmitter<Transaction> = new EventEmitter<Transaction>();

  readonly CATEGORY_ID = CATEGORY_ID;
  readonly CATEGORY_NAME = CATEGORY_NAME;
  readonly TRANSACTION_NAME = TRANSACTION_NAME;
  readonly TRANSACTION_VALUE = TRANSACTION_VALUE;
  readonly TRANSACTION_DATE = TRANSACTION_DATE;
  readonly TRANSACTION_CATEGORY_ID = TRANSACTION_CATEGORY_ID;

  constructor(
    private categoryService: CategoryService,
    private transactionService: TransactionService,
  ) {
  }

  @Input()
  set form(transactionForm: FormGroup) {
    this.transactionForm = transactionForm;
    this.isCreating = transactionForm.get(TRANSACTION_ID)?.value == null;
  }

  ngOnInit(): void {
    this.initCategories();
  }

  onCreate(): void {
    this.transactionService.create(this.transactionForm.value).pipe(
      tap(transaction => this.created.next(transaction)),
    ).subscribe();
  }

  onUpdate(): void {
    this.transactionService.update(this.transactionForm.value).pipe(
      tap(() => this.transactionForm.markAsPristine()),
      tap(transaction => this.updated.next(transaction)),
    ).subscribe();
  }

  onCancel(): void {
    this.form.reset();
  }

  private initCategories(): void {
    this.categoryOptions$ = this.categoryService.getAll();
  }
}
