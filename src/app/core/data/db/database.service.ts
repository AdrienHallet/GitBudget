import { Injectable } from '@angular/core';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {BehaviorSubject, iif, Observable, of} from 'rxjs';
import {GithubService} from '../../auth/github/logic/github.service';
import {DexieService} from './dexie.service';
import {GithubContent} from '../../../shared/models/github/github-content.model';
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

  static compareSHA(sha: string, item: string | null): boolean {
    return sha === item;
  }

  private static storeDatabaseSHA(sha: any): void {
    if (sha) {
      localStorage.setItem('db-sha', sha);
    } else {
      localStorage.removeItem('db-sha');
    }
  }

  public retrieveDatabase(): Observable<any> {
    return this.githubService.retrieveData().pipe(
      tap((data: GithubContent) => DatabaseService.storeDatabaseSHA(data.sha)),
      map((data: GithubContent) => {
        return new Blob([atob(data.content)], {type: 'application/json'});
      }),
      mergeMap((data) => this.dexieService.load(data)),
    );
  }

  public smartRetrieve(): Observable<boolean> {
    // Expose DB readiness status
    const databaseReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    this.githubService.fetchSHA().pipe(
      tap((sha: string) => console.log('SHA received:' + sha)),
      mergeMap((sha: string) =>
        iif(() => DatabaseService.compareSHA(sha, localStorage.getItem('db-sha')),
          of(true),
          this.retrieveDatabase().pipe(
            map(() => of(true))
          )
        )
      ),
      catchError(() => this.retrieveDatabase())
    ).subscribe();

    return databaseReady.asObservable();
  }

  public exportLocalDatabase(): Observable<any> {
    return this.dexieService.exportDatabase()
      .pipe(
        switchMap(database => database.text()),
        switchMap(database => this.githubService.saveDatabase(database))
      );
  }

  public deleteLocalDatabase(): void {
    DatabaseService.storeDatabaseSHA(null);
    this.dexieService.delete();
  }
}
