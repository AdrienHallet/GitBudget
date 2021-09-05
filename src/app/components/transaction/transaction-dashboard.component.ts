import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TransactionFormService} from './form/transaction-form.service';
import {Transaction} from '../../core/models/transaction.model';

@Component({
  selector: 'app-transaction-dashboard',
  templateUrl: './transaction-dashboard.component.html'
})
export class TransactionDashboardComponent implements OnInit {

  transactionForm: FormGroup;

  constructor(
    private transactionFormService: TransactionFormService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSelectTransaction($event: Transaction): void {
    this.transactionForm = this.transactionFormService.getForm($event);
  }

  onUnselectTransaction(): void {
    this.transactionForm = this.transactionFormService.getEmptyForm();
  }

  private initForm(): void {
    this.transactionForm = this.transactionFormService.getEmptyForm();
  }

}
