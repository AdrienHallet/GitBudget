import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../../../core/models/category.model';
import {CategoryService} from '../../../core/data/category.service';

/**
 * Displays the categories in a table.
 */
@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html'
})
export class CategoryTableComponent implements OnInit {

  categories$: Observable<Category[]>;

  @Output()
  unselectCategory: EventEmitter<void> = new EventEmitter();
  @Output()
  selectCategory: EventEmitter<Category> = new EventEmitter();

  constructor(
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    this.initCategories();
  }

  private initCategories(): void {
    this.categories$ = this.categoryService.getAll();
  }

  onRowSelect(event: any): void {
    this.selectCategory.emit(event.data as Category);
  }

  onRowUnselect(): void {
    this.unselectCategory.emit();
  }
}
