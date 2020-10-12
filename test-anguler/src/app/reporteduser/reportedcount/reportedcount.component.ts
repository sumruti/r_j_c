import { Component, ViewEncapsulation, OnInit, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../../app.config";
import { Router, ActivatedRoute } from '@angular/router';

//importing service
import { ReportedCountService } from '../reportedcount/reportedcount.service';

import { Modal } from 'angular2-modal/plugins/bootstrap';

import { ModalModule } from "ng2-modal";
//=================== importing form components ==================
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
// require("../../../../../node_modules/intl-tel-input");
// declare var swal: any;
import { PagesComponent } from '../../pages/pages.component';

@Component({
    selector: 'reportedcount',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./reportedcount.component.scss'],
    templateUrl: './reportedcount.component.html',
    providers: [ReportedCountService]
})

export class ReportedCountComponent implements OnInit {
    sub: any;
    userReported: any;
    reportedCount: any = [];
    msg: any = false;
    reportedBy = [];
    rowsOnPage = 10;
    public count: any;
    public p = 1;
    detailData: any;


    constructor(private route: ActivatedRoute, private _reportedcountService: ReportedCountService, private router: Router, vcRef: ViewContainerRef,public _isAdmin: PagesComponent) {

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
            this.userReported = params['username'];
        });
        this.getPage();

    }
    getPage() {
        this._reportedcountService.getReportedCount(this.userReported, this.p, this.rowsOnPage).subscribe(
            result => {
                console.log("res",result);
                if (result.data && result.data.length > 0) {
                    this.msg = false;
                    if (result.data.length < 10) {
                        jQuery("#loadButton").hide();
                    } else {
                        jQuery("#loadButton").show();
                    }
                    this.msg = false;
                    result.data.forEach(element => {
                        this.reportedBy.push(element);
                    });
                    this.p = this.p + this.rowsOnPage;
                } else {
                    this.msg = true;
                    this.reportedBy = [];
                }
            }
        )
    }

    gotoUserDatail(user) {
        // console.log("user",user)
        this._reportedcountService.getUserDetail(user).subscribe(
            result => {
                if (result.code == 200) {
                    this.detailData = result.data;
                    jQuery('#userDetail').modal('show');
                }
            }
        )
    }
}