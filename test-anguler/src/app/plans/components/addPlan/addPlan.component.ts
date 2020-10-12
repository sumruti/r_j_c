import { Component, ViewEncapsulation } from '@angular/core';
import { AppConfig } from "../../../app.config";

//importing service

@Component({
    selector: 'add-plan',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [],
    templateUrl: './addPlan.component.html'
})

export class AddPlanComponent  { 
    public config:any;
    public configFn:any; 


    constructor(private _appConfig:AppConfig){
        this.config = this._appConfig.config;
        this.configFn = this._appConfig;  
       
    } 

}
