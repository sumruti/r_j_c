import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../app.config";
import { Router } from '@angular/router';

//importing service
import { BlockRequestService } from './blockrequest.service';

import { Modal } from 'angular2-modal/plugins/bootstrap';

import { ModalModule } from "ng2-modal";
//=================== importing form components ==================
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
// require("../../../../../node_modules/intl-tel-input");
import { PagesComponent } from '../pages/pages.component';

@Component({
    selector: 'userslist',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./blockrequest.component.scss'],
    templateUrl: './blockrequest.component.html',
    providers: [BlockRequestService]
})

export class BlockRequestComponent {
    public rowsOnPage = 10;
    p = 1;
    msg: any = false;
    blockedData = [];
    blockedCount: any;
    detailData: any;
    public searchEnabled = 0;
    public searchTerm = '';
    constructor(private _appConfig: AppConfig, private _blockrequestservice: BlockRequestService, private router: Router, vcRef: ViewContainerRef, fb: FormBuilder,public _isAdmin: PagesComponent) {

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

        this.p = 1;
        this.getPage(this.p);
        // this._blockrequestservice.getBlockRequest().subscribe(
        //     result => {

        //         this.blockedData = result.data;
        //         this.blockedCount = result.count;
        //         // console.log(this.blockedData);
        //         console.log(this.blockedCount);
        //         // if (this.msg == false) {
        //         //     this.msg = true;
        //         //     this.msg = "No Block Request Available";
        //         // }

        //     }
        // )
    }

    /**
     * get page for pagination
     */

    getPage(p) {
        // console.log(this.rowsOnPage);
        // console.log(this.p);
        this._blockrequestservice.getBlockRequest(p - 1, this.rowsOnPage, this.searchTerm).subscribe(
            result => {
                // console.log("result", result);
                if (result.data && result.data.length > 0) {
                    this.msg = false;
                    this.blockedData = result.data;
                    this.blockedCount = result.count;
                    // console.log("count",this.blockedCount);
                    this.p = p;
                } else {
                    this.msg = true;
                    this.blockedData = [];
                }
            }
        )
    }
    getPageOnSearch(term) {
        // console.log("search", term);
        // console.log("search model", this.searchTerm);
        this.searchTerm = term;
        if (this.searchTerm.length > 0) {
            this.searchEnabled = 1;
        } else {
            this.searchEnabled = 0;
        }
        this.getPage(this.p);

    }
    gotoBlockDetail(username) {
        this.router.navigate(['/app/block/blockdetails', username]);
    }
    gotoUserDatail(user) {
        // console.log("user",user)
        this._blockrequestservice.getUserDetail(user).subscribe(
            result => {
                this.detailData = result.data;
                // console.log("result", result);
            }
        )
    }

}