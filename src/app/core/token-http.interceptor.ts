import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { GithubService } from './auth/github/logic/github.service';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    public githubService: GithubService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('api.github')) {
      return this.githubService.observeToken().pipe(
        mergeMap((token) => {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(request);
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
