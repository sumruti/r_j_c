//========importing page loader========
import './app.loader.ts';

//======== importing toasty ==========
// import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';


import { Component, ViewEncapsulation } from '@angular/core';

//======= defining our base component (AppComponent) =========
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls:['./app.scss'],
    templateUrl:'./app.component.html',
    providers:[]
})

//=========exporting our base component (AppComponent) =========
export class AppComponent {
    constructor(){
        
    }
}

