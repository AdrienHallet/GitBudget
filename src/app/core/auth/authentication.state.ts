import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationState {

  /**
   * The authenticated user.
   */
  user$: Observable<User>;
  private user: Subject<User>;

  private hasLogged = false;


  /**
   * Dependency Injection Constructor.
   */
  constructor() {
    this.user = new Subject();
    this.user$ = this.user.asObservable().pipe(shareReplay(1));
   }

   /**
    * Sets the user.
    */
   setUser(user: User): void {
     this.hasLogged = user !== null;
     this.user.next(user);
   }

   isLoggedIn(): boolean {
     return this.hasLogged;
   }
}
