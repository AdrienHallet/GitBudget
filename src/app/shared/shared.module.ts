import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import {CategoryPipe} from './pipes/category.pipe';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {MenubarModule} from 'primeng/menubar';
import {FieldsetModule} from 'primeng/fieldset';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TableModule} from 'primeng/table';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {AvatarModule} from 'primeng/avatar';
import {DialogModule} from 'primeng/dialog';
import {SidebarModule} from 'primeng/sidebar';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@NgModule({
  declarations: [
    CategoryPipe
  ],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // Font Awesome
    FontAwesomeModule,
    // Prime NG
    AvatarModule,
    CalendarModule,
    CardModule,
    DialogModule,
    DropdownModule,
    FieldsetModule,
    InputTextModule,
    InputNumberModule,
    MenubarModule,
    OverlayPanelModule,
    PanelModule,
    ScrollPanelModule,
    SidebarModule,
    TableModule,
    TieredMenuModule,
    ToastModule,
  ],
  exports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // Font Awesome
    FontAwesomeModule,
    CategoryPipe,
    // Prime NG
    AvatarModule,
    CalendarModule,
    CardModule,
    DialogModule,
    DropdownModule,
    FieldsetModule,
    InputTextModule,
    InputNumberModule,
    MenubarModule,
    OverlayPanelModule,
    PanelModule,
    ScrollPanelModule,
    SidebarModule,
    TableModule,
    TieredMenuModule,
    ToastModule,
  ],
  providers: [
    MessageService,
  ]
})
export class SharedModule {
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
