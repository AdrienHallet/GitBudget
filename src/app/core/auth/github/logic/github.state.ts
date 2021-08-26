import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { filter, shareReplay } from "rxjs/operators";

/**
 * Stores the Github data.
 */
@Injectable({providedIn: 'root'})
export class GithubState {

  /**
   * Do we already have the token in-memory ?
   */
   public hasToken = false;
  /**
   * The Observable token.
   */
  public token$: Observable<string>;
  /**
   * The Subject token.
   */
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  /**
   * Constructor
   */
  constructor() {
    this.token$ = this.tokenSubject.asObservable().pipe(
      filter(token => token !== ''),
      shareReplay(1)
    );
  }

  /**
   * Sets the token's next value.
   */
  public setToken(token: string) {
    this.hasToken = token !== '';
    this.tokenSubject.next(token);
  }

}
