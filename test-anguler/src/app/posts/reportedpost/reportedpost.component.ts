import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from "../../app.config";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { ReportedPostService } from './reportedpost.service';
declare var swal: any;
declare var sweetAlert: any;
import { PagesComponent } from '../../pages/pages.component';

@Component({
    selector: 'reportedpost',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./reportedpost.component.scss'],
    templateUrl: './reportedpost.component.html',
    providers: [ReportedPostService]
})

export class ReportedPostComponent {
    public count: any;
    public p = 0;
    public totalPages: any;
    public rowsOnPage = 10;
    reportedPost: any = [];
    userBan = [];
    postReject = [];
    msg: any = false;
    detailData: any;

    constructor(private _appConfig: AppConfig, private _reportedpostservice: ReportedPostService, private router: Router, public _isAdmin: PagesComponent) { }

    ngOnInit() {
        if (this._isAdmin.isAdmin == false) {
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for (var x in roleDt) {
                if (x == 'active-post') {
                    if (roleDt[x] == 0) {
                        this.router.navigate(['error']);
                    } else if (roleDt[x] == 100) {
                        jQuery("#btnreject").hide();
                    } else if (roleDt[x] == 110) {
                        jQuery("#btnreject").hide();
                    }
                }
            }
        }
        jQuery("#btnban").hide();
        this.getPage();
    }
    getPage() {
        this._reportedpostservice.getReportedPost(this.rowsOnPage, this.p).subscribe(
            result => {
                if (result.data && result.data.length) {
                    if (result.data.length < 10) {
                        jQuery("#loadButton").hide();
                    } else {
                        jQuery("#loadButton").show();
                    }
                    this.msg = false;
                    result.data.forEach(element => {
                        this.reportedPost.push(element);
                    });
                    this.p = this.p + this.rowsOnPage;

                } else {
                    this.reportedPost = [];
                    this.msg = "No Data Available";
                }

            }
        )
    }

    // gotocheck(username, event) {
    //     jQuery("#btnban").show();
    //     if (event.target.checked) {
    //         this.userBan.push(username);
    //     } else if (!event.target.checked) {
    //         let indexx = this.userBan.indexOf(username);
    //         this.userBan.splice(indexx, 1);
    //     }
    //     if (this.userBan.length == 0) {
    //         jQuery("#btnban").hide();
    //     }
    //     // console.log("element", this.userReject.length);
    // }

    gotocheck(postId, event) {
        // jQuery("#btnreject").show();
        if (event.target.checked) {
            this.postReject.push(postId);
        } else if (!event.target.checked) {
            let indexx = this.postReject.indexOf(postId);
            this.postReject.splice(indexx, 1);
        }
        if (this.postReject.length == 0) {
            // jQuery("#btnreject").hide();
            // swal("Please Select User");
        }
        // console.log("element", this.postReject);

    }
    gotoBanPost() {
        if (this.postReject.length == 0) {
            // jQuery("#btnreject").hide();
            swal("Please Select Post");
        } else {
            this._reportedpostservice.gotoBanPost(this.postReject).subscribe(
                result => {
                    // console.log("result", result);
                    if (result.code == 200) {
                        swal("Success!", "Post Banned Successfully", "success");
                    }
                    this.ngOnInit();
                }
            )
        }
    }
    gotoUnBanPost(postId) {
        this._reportedpostservice.gotoUnBanPost(postId).subscribe(
            result => {
                // console.log("result", result);
                this.ngOnInit();
            }
        )
    }
    gotoUserDatail(user) {
        // console.log("user",user)
        this._reportedpostservice.getUserDetail(user).subscribe(
            result => {
                if (result.code == 200) {
                    this.detailData = result.data;
                    jQuery('#userDetail').modal('show');
                }
            }
        )
    }
}