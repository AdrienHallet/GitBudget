import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomErrorHandler } from './core/error/custom-error.handler';
import { HeaderComponent } from './components/header/header.component';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import { TokenInterceptor } from './core/token-http.interceptor';
import {TransactionModule} from './components/transaction/transaction.module';
import {SharedModule} from './shared/shared.module';
import {CategoryModule} from './components/category/category.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    TransactionModule,
    CategoryModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(
    private fontAwesome: FaIconLibrary,
  ) {
    // Add an icon to the library for convenient access in other components
    this.fontAwesome.addIcons(
      faUserCircle,
      faGithubAlt,
      faArrowRight,
      );
  }
}
