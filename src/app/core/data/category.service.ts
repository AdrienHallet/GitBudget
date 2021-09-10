import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {from, Observable} from 'rxjs';
import {DataService} from './data.service';
import {AppTable} from './db/table.enum';
import {Category} from '../models/category.model';
import {ID} from '../models/app-data.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly TABLE = AppTable.CATEGORIES;

  constructor(
    private dataService: DataService,
  ) {}

  public update(category: Category): Observable<Category> {
    return from(this.dataService.update(this.TABLE, category.id, category)).pipe(
      map(() => category),
    );
  }

  create(newItem: Category): Observable<Category> {
    return from(this.dataService.add(this.TABLE, newItem)).pipe(
      map((id) => {
        newItem[ID] = id;
        return newItem;
      })
    );
  }

  getAll(): Observable<Category[]> {
    return this.dataService.getAll(this.TABLE) as Observable<Category[]>;
  }

  get(identifier: number): Observable<Category> {
    return this.dataService.get(this.TABLE, identifier) as Observable<Category>;
  }
}
