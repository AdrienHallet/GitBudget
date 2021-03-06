import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map, mergeMap, tap} from 'rxjs/operators';
import { AuthenticationState } from './authentication.state';
import { GithubService } from './github/logic/github.service';
import {DatabaseService} from '../data/db/database.service';
import {User} from '../../shared/models/user.model';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';


/**
 * Main authentication mechanism of the application.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {
  /**
   * Dependency Injection Constructor.
   */
  constructor(
    private authenticationState: AuthenticationState,
    private databaseService: DatabaseService,
    private githubService: GithubService,
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
         return this.authenticationState.isLoggedIn() ?
           true :
           this.router.navigate(['/'], {queryParams: { returnUrl: state.url}});
    }


  loginWithGithub(code?: any): Observable<any> {
    return this.githubService.login(code).pipe(
      tap(user => this.authenticationState.setUser(user)),
    ).pipe(
      mergeMap(() => this.databaseService.smartRetrieve())
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
  getUser(): Observable<User> {
    return this.authenticationState.user$;
  }

  /**
   * Observes the authentication state.
   */
  isAuthenticated(): Observable<boolean> {
    return this.authenticationState.user$.pipe(
      map(user => user != null),
    );
  }
}
