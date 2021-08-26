import {Component, Input} from '@angular/core';
import {CategoryService} from '../../../core/data/category.service';
import {Category} from '../../../core/models/category.model';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {CategoryFormService} from '../form/category-form.service';

/**
 * Displays the details of a category.
 */
@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html'
})
export class CategoryDetailComponent {

  activeCategory: Category;
  activeCategoryForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private categoryFormService: CategoryFormService,
  ) {
  }

  @Input()
  set category(category: Category) {
    this.activeCategory = category;
    this.activeCategoryForm = this.categoryFormService.getForm(category)
  }
}
