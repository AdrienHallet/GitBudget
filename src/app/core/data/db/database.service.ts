import { Injectable } from '@angular/core';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {GithubService} from '../../auth/github/logic/github.service';
import {DexieService} from './dexie.service';
/**
 * Manipulates the data source of the application.
 */
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private githubService: GithubService,
    private dexieService: DexieService
  ) {}

  public retrieveDatabase(): Observable<any> {
    return this.githubService.retrieveData().pipe(
      mergeMap((data) => this.dexieService.load(data)),
    );
  }

  public exportLocalDatabase(): Observable<any> {
    return this.dexieService.exportDatabase()
      .pipe(
        switchMap(database => database.text()),
        switchMap(database => this.githubService.saveDatabase(database))
      );
  }

  public deleteLocalDatabase(): void {
    this.dexieService.delete();
  }

  private storeDatabaseSHA(sha: any): void {
    if (sha) {
      localStorage.setItem('db-sha', sha);
    } else {
      localStorage.removeItem('db-sha');
    }

  }
}
