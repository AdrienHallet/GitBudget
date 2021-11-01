import {Pipe, PipeTransform} from '@angular/core';
import {CategoryService} from '../../core/data/category.service';
import {CATEGORY_NAME} from '../../core/models/category.model';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * Converts the numeric value (DB ID) into its name.
 */
@Pipe({name: 'category'})
export class CategoryPipe implements PipeTransform {

  constructor(
    private categoryService: CategoryService,
  ) {
  }

  transform(value: number): Observable<string> {
    if (value == null) {
      return of('');
    }
    return this.categoryService.get(value).pipe(
      map(category => category ? category[CATEGORY_NAME] : '?' + value + '?')
    );
  }
}
