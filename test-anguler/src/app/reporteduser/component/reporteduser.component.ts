import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../../app.config";
import { Router } from '@angular/router';

//importing service
import { ReportedUserService } from '../../reporteduser/reporteduser.service';

import { Modal } from 'angular2-modal/plugins/bootstrap';

import { ModalModule } from "ng2-modal";
//=================== importing form components ==================
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
// require("../../../../../node_modules/intl-tel-input");
declare var swal: any;
import { PagesComponent } from '../../pages/pages.component';

@Component({
    selector: 'reporteduser',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./reporteduser.component.scss'],
    templateUrl: './reporteduser.component.html',
    providers: [ReportedUserService]
})

export class ReportedUserComponent {
    rowsOnPage = 10;
    reportedUser = [];
    userReject = [];
    public count: any;
    public p = 0;
    rejectedusr: any;
    detailData: any;
    searchFlag: any;
    searchText: any;
    msg = false;
    constructor(private _appConfig: AppConfig, private _reporteduserservice: ReportedUserService, private router: Router,public _isAdmin: PagesComponent) { }

    ngOnInit() {
        if (this._isAdmin.isAdmin == false) {
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for (var x in roleDt) {
                if (x == 'registered-users') {
                    if (roleDt[x] == 0) {
                        this.router.navigate(['error']);
                    } else if(roleDt[x] == 100){
                        jQuery("#btnreject").hide();
                    } else if(roleDt[x] == 110){
                        jQuery("#btnreject").hide();
                    }
                }
            }
        }
        // jQuery("#btnreject").hide();
        this.getPage();

        // this._reporteduserservice.getReportedUser().subscribe(
        //     result => {
        //         console.log("result", result.data);
        //         this.reportedUser = result.data;
        //         console.log("reported", this.reportedUser);
        //     }

        // )

    }

    getPage() {
        // this.limit = 100;
        this._reporteduserservice.getReportedUser(this.rowsOnPage, this.p, this.searchFlag, this.searchText).subscribe(
            (result) => {
                if (result.data && result.data.length > 0) {
                    this.msg = false;                    
                    if (result.data.length < 10) {
                        jQuery("#loadButton").hide();
                    } else {
                        jQuery("#loadButton").show();
                    }
                    this.msg = false;
                    result.data.forEach(element => {
                        this.reportedUser.push(element);
                    });
                    this.p = this.p + this.rowsOnPage;
                } else {
                    this.msg = true;
                    this.reportedUser = [];
                }
            }
        );
    }

    gotocheck(userReported, event) {
        // jQuery("#btnreject").show();
        if (event.target.checked) {
            this.userReject.push(userReported);
        } else if (!event.target.checked) {
            let indexx = this.userReject.indexOf(userReported);
            this.userReject.splice(indexx, 1);
        }
        if (this.userReject.length == 0) {
            // jQuery("#btnreject").hide();
        }
        // console.log("element", this.userReject.length);

    }
    getPageOnSearch(term) {
        this.searchText = term;
        if (this.searchText.length > 0) {
            this.searchFlag = 1;
        } else {
            this.searchFlag = 0;
        }
        this.getPage();
    }
    gotoRejectUser() {
        if (this.userReject.length == 0) {
            // jQuery("#btnreject").hide();
            swal("Please Select User");
        } else {
            // console.log("rejected user", this.userReject);
            this._reporteduserservice.reporejectUser(this.userReject).subscribe(
                result => {
                    this.rejectedusr = result;
                    // console.log("rejec", this.rejectedusr);
                    swal("Good job!", "User Rejected Successfully", "success");
                    this.ngOnInit();

                }
            )
        }
    }
    gotoReported(username: any) {
        this.router.navigate(['/app/reporteduser/reportedby', username]);
    }
    gotoUserDatail(user) {
        // console.log("user",user)
        this._reporteduserservice.getUserDetail(user).subscribe(
            result => {
                if (result.code == 200) {
                    this.detailData = result.data;
                    jQuery('#userDetail').modal('show');
                }
            }
        )
    }
}