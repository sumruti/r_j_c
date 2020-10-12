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
import { MyDatePickerModule } from 'mydatepicker';
import { CustomerWalletsComponent } from './customerWallets/customerWallets.component';
import { AppWalletsComponent } from './appWallets/appWallets.component';
import { PgWalletsComponent } from './pgWallets/pgWallets.component';
@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2PaginationModule,
        CKEditorModule,
        MyDatePickerModule
    ],
    declarations: [
        CustomerWalletsComponent,
        AppWalletsComponent,
        PgWalletsComponent
    ],
    providers: [],
    exports: [
    ]

})
export class WalletsModule {

}