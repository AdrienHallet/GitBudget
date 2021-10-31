import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {LandingComponent} from './landing.component';

@NgModule({
  declarations: [
    LandingComponent,
  ],
  imports: [
      SharedModule,
  ],
  exports: [
    LandingComponent,
  ],
})
export class LandingModule {
  constructor() {
  }
}
