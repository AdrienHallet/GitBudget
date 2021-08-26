import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {CategoryTableComponent} from './table/category-table.component';
import {CategoryDashboardComponent} from './category-dashboard.component';
import {CategoryDetailComponent} from './detail/category-detail.component';
import {CategoryFormComponent} from './form/category-form.component';

@NgModule({
  declarations: [
    CategoryDashboardComponent,
    CategoryDetailComponent,
    CategoryFormComponent,
    CategoryTableComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    CategoryDashboardComponent,
  ],
})
export class CategoryModule {
  constructor() {
  }
}
