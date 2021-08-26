import {Component} from '@angular/core';
import {Category} from '../../core/models/category.model';

@Component({
  selector: 'app-category-dashboard',
  templateUrl: './category-dashboard.component.html'
})
export class CategoryDashboardComponent {

  activeCategory: Category;

  onCategorySelect(category: Category): void {
    this.activeCategory = category;
  }
}
