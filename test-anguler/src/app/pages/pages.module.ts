import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//routing
import { RouterModule } from '@angular/router';



//General
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { DashBoardComponent } from '../user/components/dashboardComponent/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';

//Charts
import { Ng2ChartsComponent } from './charts/ng2-charts/ng2-charts.component';

//
import { BlankComponent } from './blank/blank.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './error/pagenotfound.component';
import { SearchComponent } from './search/search.component';

//Inbox
import { MailComponent } from './mail/mail.component';
import { MailListComponent } from './mail/mail-list/mail-list.component';
import { MailComposeComponent } from './mail/mail-compose/mail-compose.component';
import { MailDetailComponent } from './mail/mail-detail/mail-detail.component';

//UI
//import { IconsComponent } from './ui/icons/icons.component';
import { ButtonsComponent } from './ui/buttons/buttons.component';
import { TypographyComponent } from './ui/typography/typography.component';
import { GridComponent } from './ui/grid/grid.component';
import { CardsComponent } from './ui/cards/cards.component';
import { TabsAccordionsComponent } from './ui/tabs-accordions/tabs-accordions.component';
import { ComponentsComponent } from './ui/components/components.component';
import { ListGroupComponent } from './ui/list-group/list-group.component';
import { MediaObjectsComponent } from './ui/media-objects/media-objects.component';

//Form elements
import { InputsComponent } from './form-elements/inputs/inputs.component';
import { LayoutsComponent } from './form-elements/layouts/layouts.component';
import { ValidationsComponent } from './form-elements/validations/validations.component';
import { WizardComponent } from './form-elements/wizard/wizard.component';

//Tables
import { BasicTablesComponent } from './tables/basic-tables/basic-tables.component';
import { DynamicTablesComponent } from './tables/dynamic-tables/dynamic-tables.component';

//Editors...puchna


//Maps
import { AgmCoreModule } from 'angular2-google-maps/core';
import { GoogleMapsComponent } from './maps/google/google-maps.component';
import { VectorMapsComponent } from './maps/vector/vector-maps.component';
import { LeafletMapsComponent } from './maps/leaflet/leaflet-maps.component';


// components collection
import { DatamapComponent } from './dashboard/datamap/datamap.component';
import { DynamicChartComponent } from './dashboard/dynamic-chart/dynamic-chart.component';
import { TodoComponent } from './dashboard/todo/todo.component';
import { ChatComponent } from './dashboard/chat/chat.component';
import { FeedComponent } from './dashboard/feed/feed.component';

import { FileUploaderComponent } from './form-elements/inputs/file-uploader/file-uploader.component';
import { ImageUploaderComponent } from './form-elements/inputs/image-uploader/image-uploader.component';
import { MultipleImageUploaderComponent } from './form-elements/inputs/multiple-image-uploader/multiple-image-uploader.component';

//theme components
import { Navbar } from '../theme/components/navbar/navbar.component';
import { Messages } from '../theme/components/messages/messages.component';
import { Sidebar } from '../theme/components/sidebar/sidebar.component';
import { Breadcrumb } from '../theme/components/breadcrumb/breadcrumb.component';
import { BackTop } from '../theme/components/back-top/back-top.component';

//directives
import {SlimScroll} from '../theme/directives/slim-scroll/slim-scroll.directive';
import {ProgressAnimate} from '../theme/directives/progress-animate/progress-animate.directive';
import {Widget} from '../theme/directives/widget/widget.directive';
import {LiveTile} from '../theme/directives/live-tile/live-tile.directive';
//import {Skycon} from '../theme/directives/skycon/skycon.directive';
import {Counter} from '../theme/directives/counter/counter.directive';
import {DropzoneUpload} from '../theme/directives/dropzone/dropzone.directive';


//pipes
import {ProfilePicturePipe} from '../theme/pipes/profilePicture/profilePicture.pipe';
import {AppPicturePipe} from '../theme/pipes/appPicture/appPicture.pipe';
import {SearchPipe} from '../theme/pipes/search/search.pipe';
import {MailSearchPipe} from '../theme/pipes/search/mail-search.pipe';

//for modal(popup)
import { ModalModule } from 'angular2-modal';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FroalaEditorModule } from "ng2-froala-editor/ng2-froala-editor"; 
import { CKEditorModule } from 'ng2-ckeditor';
import { DataTableModule } from "angular2-datatable";


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ChartsModule,
    FroalaEditorModule,
    CKEditorModule,
    DataTableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDe_oVpi9eRSN99G4o6TwVjJbFBNr58NxE'
    }),
    ModalModule.forRoot()
  ],
  declarations: [
    PagesComponent,
    BlankComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    SearchComponent,
    CalendarComponent,
    MailComponent,
    MailListComponent,
    MailComposeComponent,
    MailDetailComponent,
    Navbar,
    Messages,
    Sidebar,
    // DashboardComponent,
    DashBoardComponent,
    DatamapComponent,
    DynamicChartComponent,
    TodoComponent,
    ChatComponent,
    FeedComponent,    
    GoogleMapsComponent,
    VectorMapsComponent,
    LeafletMapsComponent, 
    //IconsComponent,
    ButtonsComponent,
    TypographyComponent,
    GridComponent, 
    CardsComponent, 
    TabsAccordionsComponent,
    ComponentsComponent,
    ListGroupComponent, 
    MediaObjectsComponent,
    InputsComponent,
    FileUploaderComponent,
    ImageUploaderComponent,
    MultipleImageUploaderComponent,
    LayoutsComponent,
    ValidationsComponent,
    WizardComponent,
    BasicTablesComponent,
    DynamicTablesComponent,
    Ng2ChartsComponent,
    Breadcrumb,
    BackTop,
    SlimScroll,
    ProgressAnimate,
    Widget,
    LiveTile,
    // Skycon,
    Counter,
    DropzoneUpload,
    ProfilePicturePipe,
    AppPicturePipe,
    SearchPipe,
    MailSearchPipe
  ],  
  providers: [],
  exports: [
  PagesComponent,
    BlankComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    SearchComponent,
    CalendarComponent,
    MailComponent,
    MailListComponent,
    MailComposeComponent,
    MailDetailComponent,
    Navbar,
    Messages,
    Sidebar,
    // DashboardComponent,
    DashBoardComponent,
    DatamapComponent,
    DynamicChartComponent,
    TodoComponent,
    ChatComponent,
    FeedComponent,    
    GoogleMapsComponent,
    VectorMapsComponent,
    LeafletMapsComponent, 
    //IconsComponent,
    ButtonsComponent,
    TypographyComponent,
    GridComponent, 
    CardsComponent, 
    TabsAccordionsComponent,
    ComponentsComponent,
    ListGroupComponent, 
    MediaObjectsComponent,
    InputsComponent,
    FileUploaderComponent,
    ImageUploaderComponent,
    MultipleImageUploaderComponent,
    LayoutsComponent,
    ValidationsComponent,
    WizardComponent,
    BasicTablesComponent,
    DynamicTablesComponent,
    Ng2ChartsComponent,
    Breadcrumb,
    BackTop,
    SlimScroll,
    ProgressAnimate,
    Widget,
    LiveTile,
    // Skycon,
    Counter,
    DropzoneUpload,
    ProfilePicturePipe,
    AppPicturePipe,
    SearchPipe,
    MailSearchPipe]
 
})
export class PageModule {
   static forRoot(): ModuleWithProviders {
       return {
           ngModule: PageModule,
           providers: []
       };
   }
}