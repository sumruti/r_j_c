import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomFormsModule } from 'ng2-validation'
import { RouterModule } from '@angular/router';

import {Ng2PaginationModule,PaginationService, PaginationControlsDirective,
PaginationControlsComponent,PaginatePipe} from 'ng2-pagination';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { RejectedUserComponent } from './component/rejecteduser.component';

import { DataTableModule } from "angular2-datatable";

import { AgmCoreModule } from "angular2-google-maps/core";

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
  ],
  declarations: [
    RejectedUserComponent

  ],
 
  providers: [PaginationService],
  exports: [
  ]

 
})
export class RejectedUserModule {
   
}