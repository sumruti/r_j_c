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
import { UserPostComponent } from '../userpost/userpost.component';
import { Negotiable } from '../../../theme/pipes/negotiable/negotiable.pipe';
import { PostType } from '../../../theme/pipes/negotiable/postType.pipe';

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
        UserPostComponent, Negotiable, PostType
    ],
    providers: [],
    exports: [

    ]

})

export class UserPostModule {

}
