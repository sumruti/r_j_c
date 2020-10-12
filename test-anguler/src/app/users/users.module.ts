import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomFormsModule } from 'ng2-validation'
import { RouterModule } from '@angular/router';

import {
  Ng2PaginationModule, PaginationService, PaginationControlsDirective,
  PaginationControlsComponent, PaginatePipe
} from 'ng2-pagination';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { UsersListComponent } from './component/userslist/users.component';

import { DataTableModule } from "angular2-datatable";
import { PushMessagesComponent } from './component/pushmessages/pushmessages.component';
import { AgmCoreModule } from "angular2-google-maps/core";
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
import { PushUserCountComponent } from './component/pushusercount/pushusercount.component';
import { UserRatingComponent } from './component/userRating/userRating.component';
import { UserAvgRatingComponent } from './component/userRating/avgRating/avgRating.component';
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    Ng2PaginationModule,
    DataTableModule,
    CustomFormsModule,
    Ng2CloudinaryModule,
    FileUploadModule,
  ],
  declarations: [
    UsersListComponent,
    PushMessagesComponent,
    PushUserCountComponent,
    UserRatingComponent,
    UserAvgRatingComponent

  ],

  providers: [PaginationService],
  exports: [
  ]


})
export class UsersModule {

}