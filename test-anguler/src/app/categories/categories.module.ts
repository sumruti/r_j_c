import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { CategoriesComponent } from './component/categories.component';
import {
    Ng2PaginationModule, PaginationService, PaginationControlsDirective,
    PaginationControlsComponent, PaginatePipe
} from 'ng2-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
// import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';

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

    ],
    declarations: [
        CategoriesComponent
    ],
    providers: [],
    exports: [

    ]

})

export class CategoriesModule {

}
