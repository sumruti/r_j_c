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

import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { CKEditorModule } from 'ng2-ckeditor';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
import { MyDatePickerModule } from 'mydatepicker';
import { HomeComponent } from './home/home.component';
import { HowItWorkComponent } from './howitworks/howitworks.component';
import { AboutComponent } from './about/about.component';
import { TermComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { HelpComponent } from './help/help.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SitemapComponent } from './sitemap/sitemap.component';
@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2PaginationModule,
        Ng2CloudinaryModule,
        FileUploadModule,
        CKEditorModule,
        MyDatePickerModule,
    ],
    declarations: [
        HomeComponent,
        HowItWorkComponent,
        AboutComponent,
        TermComponent,
        PrivacyComponent, HelpComponent, LoginComponent, RegisterComponent, SitemapComponent
    ],
    providers: [],
    exports: [
    ]

})
export class SeoModule {

}