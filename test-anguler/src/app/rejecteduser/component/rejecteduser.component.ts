import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../../app.config";
import { Router } from '@angular/router';

//importing service
import { RejectedUserService } from '../../rejecteduser/rejecteduser.service';

import { Modal } from 'angular2-modal/plugins/bootstrap';

import { ModalModule } from "ng2-modal";
//=================== importing form components ==================
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
// require("../../../../../node_modules/intl-tel-input");
declare var swal: any;
import { PagesComponent } from '../../pages/pages.component';

@Component({
    selector: 'rejecteduser',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./rejecteduser.component.scss'],
    templateUrl: './rejecteduser.component.html',
    providers: [RejectedUserService]
})

export class RejectedUserComponent {
    rejectedUser: any;
    userReactive = [];
    public rowsOnPage = 10;
    reuser: any;
    public p = 1;
    public count: any;
    public totalPages: any;
    public searchEnabled = 0;
    public searchTerm = '';
    msg: any = false;
    detailData:any;
    constructor(private _appConfig: AppConfig, private _rejectedUserService: RejectedUserService, private router: Router, vcRef: ViewContainerRef, fb: FormBuilder,public _isAdmin: PagesComponent) { }

    ngOnInit() {
        if (this._isAdmin.isAdmin == false) {
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for (var x in roleDt) {
                if (x == 'registered-users') {
                    if (roleDt[x] == 0) {
                        this.router.navigate(['error']);
                    } else if(roleDt[x] == 100){
                        jQuery("#btnreactive").hide();
                    } else if(roleDt[x] == 110){
                        jQuery("#btnreactive").hide();
                    }
                }
            }
        }
        // jQuery("#btnreactive").hide();
        this.p = 1;
        this.getPage(this.p);
        // this._rejectedUserService.rejecteduser().subscribe(
        //     result => {
        //         this.rejectedUser = result.data;
        //     }
        // )
    }
    getPage(p) {
        this._rejectedUserService.rejecteduser(p - 1, this.rowsOnPage, this.searchEnabled, this.searchTerm, ).subscribe(
            result => {
                if (result.data && result.data.length > 0) {
                    this.msg = false;
                    this.rejectedUser = result.data;
                    // console.log("res", this.rejectedUser);
                    this.p = p;
                    this.count = result.count;
                    // console.log("rs",this.count);
                    //this.totalPages = Math.ceil(result[0].count / 10);
                    // console.log("data", this.rejectedUser);
                    // //this.total=this.usersList.length;
                    // console.log("total" + this.count);
                } else {
                    this.rejectedUser = [];
                    this.msg = "No Rejected Users Available";
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
    gotocheck(username, event) {
        // jQuery("#btnreactive").show();
        if (event.target.checked) {
            this.userReactive.push(username);
        } else if (!event.target.checked) {
            let indexx = this.userReactive.indexOf(username);
            this.userReactive.splice(indexx, 1);
        }
        if (this.userReactive.length == 0) {
            // jQuery("#btnreactive").hide();
        }
        // console.log("element", this.userReject.length);

    }
    gotoReactiveUser() {
        if (this.userReactive.length == 0) {
            // jQuery("#btnreject").hide();
            swal("Please Select User");
        } else {
            // console.log("rejected user", this.userReactive);
            this._rejectedUserService.reactiveuser(this.userReactive).subscribe(
                result => {
                    this.reuser = result;
                    // console.log("reuser", this.reuser);
                    swal("Good job!", "User Re-Activated Successfully", "success");
                    this.ngOnInit();
                }
            )
        }
    }
    gotoUserDatail(user) {
        // console.log("user",user)
        this._rejectedUserService.getUserDetail(user).subscribe(
            result => {
                if (result.code == 200) {
                    this.detailData = result.data;
                    jQuery('#userDetail').modal('show');
                }
            }
        )
    }


}