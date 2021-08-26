import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Category, CATEGORY_NAME} from '../../../core/models/category.model';
import {CategoryService} from '../../../core/data/category.service';

/**
 * Form to manipulate the categories.
 */
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent {

  categoryForm: FormGroup;
  isCreating: boolean;

  readonly categoryNameControl = CATEGORY_NAME;

  constructor(
    private categoryService: CategoryService,
  ) {
  }

  @Input()
  public set form(form: FormGroup) {
    this.categoryForm = form;
    this.isCreating = form.value.id == null;
  }

  onCreateClick(): void {
    this.categoryService.create(this.categoryForm.value);
  }

  onUpdateClick(): void {
    this.categoryService.update(this.categoryForm.value);
  }
}
