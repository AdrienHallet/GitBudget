import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, iif, Observable} from 'rxjs';
import {catchError, filter, map, mergeMap, shareReplay, switchMap, take, tap} from 'rxjs/operators';
import {IllegalStateError} from 'src/app/core/error/type/illegal-state.error';
import {User} from 'src/app/shared/models/user.model';
import {AuthenticationState} from '../../authentication.state';
import {GithubApi} from './github.api';
import {GithubState} from './github.state';
import {GithubContent} from '../../../../shared/models/github/github-content.model';
import {GithubRepo} from '../../../../shared/models/github/github-repo.model';
import {environment} from '../../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class GithubService {

  constructor(
    private githubApi: GithubApi,
    private githubState: GithubState,
    private authenticationState: AuthenticationState,
    private httpClient: HttpClient,
  ) {
  }

  /**
   * Returns the observable token.
   */
  observeToken(): Observable<string> {
    return this.githubState.token$;
  }

  login(code?: any): Observable<User> {
    return this.retrieveToken(code).pipe(
      tap((val) => console.log('login fired: ' + val)),
      switchMap((val) => this.fetchUser(val)),
    );
  }

  logOut(): void {
    this.storeToken(null);
  }

  fetchUser(token: string): Observable<User> {
    console.log('fetching ... ' + token);
    return this.githubApi.getUser(token).pipe(
      take(1),
    );
  }

  public retrieveData(): Observable<Blob> {
    let exposedUser: User;
    return this.authenticationState.user$.pipe(
      mergeMap((user, index) => {
        exposedUser = user;
        return this.githubApi.getRepository(user.login, 'budget-dev').pipe(
          catchError(() => this.createRepository()),
        );
      }),
      mergeMap((user, index) => {
        return this.githubApi.getFileInfo(exposedUser.login, 'budget-dev', 'data.sqlite').pipe(
          catchError(() => this.createDatabase(exposedUser))
        );
      }),
      mergeMap((data: GithubContent) =>
          iif(() => data === null,
            this.createDatabase(exposedUser) ,
            this.githubApi.getBlob(data.git_url)),
      ),
      map((data) => {
        return new Blob([atob(data.content)], {type: 'application/json'});
      })
    );
  }

  createRepository(): Observable<GithubRepo> {
    return this.authenticationState.user$.pipe(
      mergeMap(user => {
        return this.githubApi.createRepository(user.login, 'budget-dev');
      })
    );
  }

  createDatabase(user: User): Observable<GithubContent> {
    return this.githubApi.createDatabase(user.login, 'budget-dev', 'data.sqlite');
  }

  saveDatabase(data: string): any {
    return this.authenticationState.user$.pipe(
      mergeMap(user => {
        return this.githubApi.saveDatabase(user.login, 'budget-dev', 'data.sqlite', data);
      })
    );
  }

  /**
   * Retrieve the token (closest-source first).
   *
   * @param code the temporary authentication code
   */
  public retrieveToken(code?: any): Observable<string> {
    const localToken = this.retrieveLocalToken();
    if (localToken) {
      this.storeToken(localToken);
      return new BehaviorSubject<string>(localToken).asObservable();
    } else {
      if (!code) {
        console.log(environment.oauthClientId);
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${environment.oauthClientId}&scope=repo`;
        throw new IllegalStateError('Unreachable');
      } else {
        return this.githubApi.getToken(code).pipe(
          tap(
            (token) => this.storeToken(token),
            () => this.githubState.hasToken = false)
        )
      }
    }
  }

  private storeToken(token: any) {
    if (token) {
      localStorage.setItem('token', token);
      this.githubState.setToken(token);
    } else {
      localStorage.removeItem('token');
      this.githubState.setToken('');
    }

  }

  /**
   * Retrieves the token locally.
   */
  private retrieveLocalToken() {
    return localStorage.getItem('token');
  }
}