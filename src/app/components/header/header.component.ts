import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import { filter, flatMap, mergeMap, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';
import { DataService } from 'src/app/core/data/data.service';
import { User } from 'src/app/shared/models/user.model';
import {GithubService} from '../../core/auth/github/logic/github.service';
import {DexieService} from '../../core/data/db/dexie.service';
import {TransactionService} from '../../core/data/transaction.service';
import {ID} from '../../core/models/app-data.model';
import {Transaction} from '../../core/models/transaction.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  /**
   * The connected user.
   */
  user$: Observable<User | null>;

  mainMenuItems: any;
  buttonMenuItems: any;

  private onDestroy$ = new Subject();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private githubService: GithubService,
    private dexieService: DexieService,
    private transactionService: TransactionService,
  ) {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  ngOnInit(): void {
    this.initializeUser();
    this.redirectAuthentication();
    this.initMenuItems();
  }

  githubLogin(code?: any): void {
    this.authenticationService.loginWithGithub(code)
      .pipe(
        take(1),
        takeUntil(this.onDestroy$),
      )
    .subscribe();
  }

  async export(): Promise<void> {
    const db = await this.dexieService.export();
    const dbString = await db.text();
    this.githubService.saveDatabase(dbString).subscribe();
  }

  async onLogOut(): Promise<void> {
    this.authenticationService.logOut();
  }

  private redirectAuthentication(): void {
    this.activatedRoute.queryParams.pipe(
      takeUntil(this.authenticationService.isAuthenticated()),
      filter(params => params.code != null),
      tap((params) => this.githubLogin(params.code) )
    ).subscribe();
  }



  private initializeUser(): void {
    this.user$ = this.authenticationService.getUser();
  }


  private initMenuItems(): void {
    this.mainMenuItems = [
      {
        label: 'Transactions',
        icon: 'pi pi-fw pi-file',
        routerLink: '/transactions',
      },
      {
        label: 'Categories',
        icon: 'pi pi-fw pi-folder',
        routerLink: '/categories',
      }
    ];
    this.buttonMenuItems = [
      {
        label: 'Log out',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.onLogOut(),
      }
    ];
  }

  insertTestData(): void {
    for (let i = 0; i < 10000; i++) {
      this.transactionService.create({
        name: 'Test transaction - ' + i,
        date: new Date(),
      } as Transaction).pipe(take(1)).subscribe();
    }
  }

  onAppNameClick(): void {
    this.router.navigate(['/']);
  }
}
