import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../../app.config";
import { Router, ActivatedRoute } from '@angular/router';

//importing service
import { BlockDetailService } from './blockdetail.service';

import { Modal } from 'angular2-modal/plugins/bootstrap';

import { ModalModule } from "ng2-modal";
//=================== importing form components ==================
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
// require("../../../../../node_modules/intl-tel-input");
import { PagesComponent } from '../../pages/pages.component';

@Component({
    selector: 'blockdetail',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./blockdetail.component.scss'],
    templateUrl: './blockdetail.component.html',
    providers: [BlockDetailService]
})

export class BlockDetailComponent {
    sub: any;
    username: any;
    blockDetail:any;
    public rowsOnPage = 10;
    detailData:any;
    p = 1;
    constructor(private route: ActivatedRoute, private _appConfig: AppConfig, private _blockdetailservice: BlockDetailService, private router: Router, vcRef: ViewContainerRef, fb: FormBuilder,public _isAdmin: PagesComponent) {

    }
    ngOnInit() {
        if (this._isAdmin.isAdmin == false) {
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for (var x in roleDt) {
                if (x == 'registered-users') {
                    if (roleDt[x] == 0) {
                        this.router.navigate(['error']);
                    } 
                }
            }
        }

        this.sub = this.route.params.subscribe(params => {
            this.username = params['username'];
        });
        this._blockdetailservice.getblockdetail(this.username).subscribe(
            result => {
                this.blockDetail = result.data;
                // console.log("result",result);
            }
        )
    }
    gotoUserDatail(user) {
        // console.log("user",user)
        this._blockdetailservice.getUserDetail(user).subscribe(
            result => {
                this.detailData = result.data;
                // console.log("result", result);
            }
        )
    }
}