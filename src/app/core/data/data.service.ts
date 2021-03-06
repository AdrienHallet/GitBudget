import { Injectable } from '@angular/core';
import { GithubService } from '../auth/github/logic/github.service';
import {Observable} from 'rxjs';
import {DexieService} from './db/dexie.service';
import {AppData} from '../models/app-data.model';
import {AppTable} from './db/table.enum';

/**
 * Manipulates the data source of the application.
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private githubService: GithubService,
    private dexieService: DexieService
  ) {}

  public add(table: AppTable, item: AppData): Observable<number> {
    return this.dexieService.addRow(table, item);
  }

  public update(table: AppTable, key: number, item: AppData): Observable<number> {
    return this.dexieService.updateRow(table, key, item);
  }

  public getAll(table: AppTable): Observable<AppData[]> {
    return this.dexieService.getAll(table);
  }

  public getPage(table: AppTable, pageSize: number, page: number, reverse?: boolean): Observable<AppData[]> {
    return this.dexieService.getPage(table, pageSize, page, reverse);
  }

  public get(table: AppTable, key: number): Observable<AppData> {
    return this.dexieService.getRow(table, key);
  }

  count(table: AppTable): Observable<number> {
    return this.dexieService.count(table);
  }
}
