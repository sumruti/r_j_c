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

import { AdminConfigComponent } from '../admin/adminconfig/adminconfig.component';
import { AdminPolicyComponent } from '../admin/adminpolicy/adminpolicy.component';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { CKEditorModule } from 'ng2-ckeditor';
import { AdminNewsComponent } from './adminnews/adminnews.component';
import { AdminAboutComponent } from './adminabout/adminabout.component';
import { AdminStoryComponent } from './adminstory/adminstory.component';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
import { SocialMediaComponent } from './socialmedia/socialmedia.component';
import { MyDatePickerModule } from 'mydatepicker';
import { ManageAccessComponent } from './manageAccess/manageAccess.component';
import { SendPushComponent } from './sendPush/sendPush.component';
import { newPushComponent } from './sendPush/newPush/newPush.component';
import { addRolesComponent } from './manageAccess/addRoles/addRoles.component';
import { pushTargetedUserComponent } from './sendPush/targetedUser/targetedUser.component';
import { FAQComponent } from './adminfaq/adminfaq.component';

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
        MyDatePickerModule
    ],
    declarations: [
        AdminConfigComponent,
        AdminPolicyComponent,
        AdminNewsComponent,
        AdminAboutComponent,
        AdminStoryComponent,
        ImageCropperComponent,
        SocialMediaComponent,
        ManageAccessComponent,
        SendPushComponent,
        newPushComponent,
        addRolesComponent,
        pushTargetedUserComponent,
        FAQComponent
    ],
    providers: [],
    exports: [
    ]

})
export class AdminModule {

}