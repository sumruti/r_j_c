import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { DeviceComponent } from '../device/devices.component';

@NgModule({
    imports:[
        BrowserModule,
        HttpModule,
        RouterModule,

    ],
    declarations:[
        DeviceComponent
    ],
    providers :[],
    exports:[]

})

export class DeviceModule{
    
}
