import {Pipe, PipeTransform} from '@angular/core';
import {CategoryService} from '../../core/data/category.service';
import {CATEGORY_NAME} from '../../core/models/category.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Pipe({name: 'category'})
export class CategoryPipe implements PipeTransform {

  constructor(
    private categoryService: CategoryService,
  ) {
  }

  transform(value: number): Observable<string> {
    return this.categoryService.get(value).pipe(map(category => category ? category[CATEGORY_NAME] : '?' + value + '?'));
  }
}
