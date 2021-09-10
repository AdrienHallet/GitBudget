import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TransactionFormService} from './form/transaction-form.service';
import {Transaction} from '../../core/models/transaction.model';
import {TransactionTableComponent} from './table/transaction-table.component';

@Component({
  selector: 'app-transaction-dashboard',
  templateUrl: './transaction-dashboard.component.html',
  providers: [],
})
export class TransactionDashboardComponent implements OnInit {

  transactionForm: FormGroup;
  showForm: boolean;
  selectedTransaction: Transaction | undefined;
  @ViewChild('transactionTableComponent')
  transactionTableComponent: TransactionTableComponent;

  constructor(
    private transactionFormService: TransactionFormService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  onAddTransaction(): void {
    this.initForm();
    this.showForm = true;
    this.transactionTableComponent.select(null);
  }

  onCreated(transaction: Transaction): void {
    this.transactionTableComponent.select(transaction);
    this.transactionForm = this.transactionFormService.getForm(transaction);
  }

  onSelectTransaction($event: Transaction): void {
    this.transactionForm = this.transactionFormService.getForm($event);
    this.showForm = true;
  }

  onUnselectTransaction(): void {
    this.transactionForm = this.transactionFormService.getEmptyForm();
    this.showForm = false;
  }

  private initForm(): void {
    this.transactionForm = this.transactionFormService.getEmptyForm();
  }
}
