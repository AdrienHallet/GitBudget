import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map, mergeMap, tap} from 'rxjs/operators';
import { AuthenticationState } from './authentication.state';
import { GithubService } from './github/logic/github.service';
import {DatabaseService} from '../data/db/database.service';


/**
 * Main authentication mechanism of the application.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  /**
   * Dependency Injection Constructor.
   */
  constructor(
    private authenticationState: AuthenticationState,
    private databaseService: DatabaseService,
    private githubService: GithubService,
  ) { }


  loginWithGithub(code?: any): Observable<any> {
    return this.githubService.login(code).pipe(
      tap(user => this.authenticationState.setUser(user)),
    ).pipe(
      mergeMap(() => this.databaseService.retrieveDatabase().pipe(tap((resp) => console.log('answer'))))
    );
  }

  logOut(): void {
    this.githubService.logOut();
    this.databaseService.exportLocalDatabase();
    this.databaseService.deleteLocalDatabase();
    this.authenticationState.setUser(null as any);
  }

  /**
   * Observes the current user.
   */
  getUser() {
    return this.authenticationState.user$;
  }

  /**
   * Observes the authentication state.
   */
  isAuthenticated() {
    return this.authenticationState.user$.pipe(
      map(user => user != null),
    );
  }
}
