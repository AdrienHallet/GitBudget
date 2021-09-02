import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  Transaction,
  TRANSACTION_CATEGORY_ID,
  TRANSACTION_DATE,
  TRANSACTION_ID,
  TRANSACTION_NAME, TRANSACTION_VALUE
} from '../../../core/models/transaction.model';

/**
 * Manipulates {@link FormGroup} in the context of {@link Transaction}
 */
@Injectable({
  providedIn: 'root'
})
export class TransactionFormService {

  constructor(
    private fb: FormBuilder,
  ) {
  }

  public getEmptyForm(): FormGroup {
    return this.fb.group({
      [TRANSACTION_ID]: [],
      [TRANSACTION_NAME]: ['', Validators.required],
      [TRANSACTION_DATE]: ['', Validators.required],
      [TRANSACTION_VALUE]: [null, Validators.required],
      [TRANSACTION_CATEGORY_ID]: []
    });
  }

  public getForm(transaction: Transaction): FormGroup {
    const form: FormGroup = this.getEmptyForm();
    form.patchValue(transaction);
    return form;
  }

}
