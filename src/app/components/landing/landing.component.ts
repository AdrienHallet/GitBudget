import {Component, OnDestroy} from '@angular/core';
import {take, takeUntil} from 'rxjs/operators';
import {AuthenticationService} from '../../core/auth/authentication.service';
import {Observable, Subject} from 'rxjs';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  providers: [],
})
export class LandingComponent implements OnDestroy {

  user$: Observable<User>;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private authenticationService: AuthenticationService,
  ) {
    this.initUser();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.unsubscribe();
  }

  githubLogin(code?: any): void {
    this.authenticationService.loginWithGithub(code)
      .pipe(
        take(1),
        takeUntil(this.onDestroy$),
      )
      .subscribe();
  }

  private initUser(): void {
    this.user$ = this.authenticationService.getUser();
  }
}
