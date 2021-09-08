import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { GithubService } from './core/auth/github/logic/github.service';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend';

  isCollapsed = false;

  data: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private githubService: GithubService,
  ) {
  }

  ngOnInit(): void {
    this.document.documentElement.classList.add('theme-dark');
    this.redirectAuthentication();
  }

  toggleNav(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  private redirectAuthentication(): void {
    this.activatedRoute.queryParams.pipe(
      take(1),
      tap((params) => params['code'] != null ? this.githubService.login() : null )
    ).subscribe();
    this.activatedRoute.params.pipe(
      take(1),
      tap((params) => params['code'] != null ? this.githubService.login() : null )
    ).subscribe();
  }
}
