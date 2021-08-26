import {Injectable} from '@angular/core';
import {from, Observable, Subject} from 'rxjs';

// Dexie Imports
import {Dexie} from 'dexie'; // Core
import 'dexie-observable';
import {exportDB, importInto} from 'dexie-export-import';
import {AppTable} from './table.enum';
import {AppData, ID} from '../../models/app-data.model';

/**
 * Dexie-interface service
 */
@Injectable({
  providedIn: 'root'
})
export class DexieService extends Dexie {

  constructor() {
    super('budget-dev');
    this.version(3).stores({
      [AppTable.TRANSACTIONS]: '++id, name, date, value, categoryId',
      [AppTable.CATEGORIES]: '++id, name',
    });

    this.on('changes', changes => {
      changes.forEach((data) => console.log(data));
    });
  }

  exportDatabase(): Observable<Blob> {
    const liveDb: Dexie = this.vip;
    return from(exportDB(liveDb));
  }

  load(blob: Blob): Promise<void> {
    return importInto(this, blob, {
      overwriteValues: true,
      acceptMissingTables: true,
      acceptVersionDiff: true,
    });
  }

  updateRow(table: AppTable, key: number, changes: AppData): Observable<number> {
    return from(
      this.table(table).update(key, changes)
    );
  }

  addRow(table: AppTable, item: AppData): Observable<any> {
    if (item[ID]) {
      throw Error('A key should not be defined when creating data');
    }
    const dataObject: any = item;
    delete dataObject?.id;
    return from(
      this.table(table).add(dataObject)
    );
  }

  getRow(table: AppTable, key: number): Observable<AppData> {
    return from(
      this.table(table).get(key)
    );
  }

  getAll(tableName: AppTable): Observable<AppData[]> {
    const subject = new Subject<AppData[]>();
    Dexie.liveQuery(
      () => this.table(tableName).toArray()
    ).subscribe({
      next: data => subject.next(data),
    });
    return subject.asObservable();
  }

  count(tableName: AppTable): Observable<number> {
    return from(this.table(tableName).count());
  }

  getPage(table: AppTable, pageSize: number, page: number): Observable<AppData[]> {
    return from(
      this.table(table).where(ID).above(page * pageSize).limit(pageSize).toArray()
    );
  }
}
