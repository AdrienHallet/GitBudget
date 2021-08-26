import {Component, Injectable, Input} from '@angular/core';
import {Category, CATEGORY_NAME} from '../../../core/models/category.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryModule} from '../category.module';
import {ID} from '../../../core/models/app-data.model';

/**
 * Manipulates {@link } in the context of {@link Category}
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryFormService {

  constructor(
    private fb: FormBuilder,
  ) {
  }

  public getEmptyForm(): FormGroup {
    return this.fb.group({
      [ID]: [],
      [CATEGORY_NAME]: ['', Validators.required],
    });
  }

  public getForm(category: Category): FormGroup {
    const form: FormGroup = this.getEmptyForm();
    form.patchValue(category);
    return form;
  }

}
