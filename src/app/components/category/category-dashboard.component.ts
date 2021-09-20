import {Component} from '@angular/core';
import {Category} from '../../core/models/category.model';
import {CategoryFormService} from './form/category-form.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-category-dashboard',
  templateUrl: './category-dashboard.component.html'
})
export class CategoryDashboardComponent {

  formCategory: FormGroup;

  constructor(
    private categoryFormService: CategoryFormService,
  ) {
    this.resetFormEmpty();
  }

  onCategorySelect(category: Category): void {
    this.formCategory = this.categoryFormService.getForm(category);
  }

  onCategoryUnselect(): void {
    this.resetFormEmpty();
  }

  private resetFormEmpty(): void {
    this.formCategory = this.categoryFormService.getEmptyForm();
  }
}
