import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { WishListComponent } from '../wishlist/wishlist.component';
// import { Negotiable } from '../../../theme/pipes/negotiable/negotiable.pipe';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule,

    ],
    declarations: [
        WishListComponent,
    ],
    providers: [],
    exports: [

    ]

})

export class WishListModule {

}
