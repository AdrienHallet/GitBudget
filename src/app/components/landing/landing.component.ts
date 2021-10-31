import {Component, OnDestroy} from '@angular/core';
import {take, takeUntil} from 'rxjs/operators';
import {AuthenticationService} from '../../core/auth/authentication.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  providers: [],
})
export class LandingComponent implements OnDestroy {

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private authenticationService: AuthenticationService,
  ) {
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

}
