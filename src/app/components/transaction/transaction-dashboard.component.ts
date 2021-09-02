import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TransactionFormService} from './form/transaction-form.service';

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

  private initForm(): void {
    this.transactionForm = this.transactionFormService.getEmptyForm();
  }
}
