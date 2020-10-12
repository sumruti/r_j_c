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
import { DataTableModule } from "angular2-datatable";
import { AgmCoreModule } from "angular2-google-maps/core";
import { CreatePostComponent } from './createpost.component';

import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
// import { CurrencyMaskModule } from "ng2-currency-mask";
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
    // CurrencyMaskModule
  ],
  declarations: [
    CreatePostComponent

  ],

  providers: [PaginationService],
  exports: [
  ]


})
export class CreatePostModule {

}