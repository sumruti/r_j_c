import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from "../../app.config";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { BannedPostService } from './bannedpost.service';
declare var swal: any;
declare var sweetAlert: any;
import { PagesComponent } from '../../pages/pages.component';

@Component({
    selector: 'bannedpost',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./bannedpost.component.scss'],
    templateUrl: './bannedpost.component.html',
    providers: [BannedPostService]
})

export class BannedPostComponent {
    public p = 1;
    public rowsOnPage = 10;
    msg: any = false;
    banData: any = [];
    detailData: any;
    unbanPost: any = [];
    constructor(private _appConfig: AppConfig, private _bannedpostservice: BannedPostService, private router: Router,public _isAdmin: PagesComponent) { }

    ngOnInit() {
        if (this._isAdmin.isAdmin == false) {
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for (var x in roleDt) {
                if (x == 'active-post') {
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

        this.getpage();
    }
    getpage() {
        this._bannedpostservice.getbannedpost().subscribe(
            result => {
                // console.log("result", result);
                if (result.data && result.data.length > 0) {
                    this.msg = false;
                    this.banData = result.data;
                } else {
                    this.banData = [];
                    this.msg = "No Data Available";
                }
            }
        )
    }
    gotocheck(postId, event) {
        if (event.target.checked) {
            this.unbanPost.push(postId);
        } else if (!event.target.checked) {
            let indexx = this.unbanPost.indexOf(postId);
            this.unbanPost.splice(indexx, 1);
        }
        if (this.unbanPost.length == 0) {
            ;
        }

    }
    gotoUnbanPost() {
        if (this.unbanPost.length == 0) {
            swal("Please Select Post");
        } else {
            this._bannedpostservice.gotoUnbanPost(this.unbanPost).subscribe(
                result => {
                    // console.log("result", result);
                    if (result.code == 200) {
                        swal("Success!", "Post Un Ban Successfully", "success");
                    }
                    this.ngOnInit();
                }
            )
        }
    }
    gotoUserDatail(user) {
        // console.log("user",user)
        this._bannedpostservice.getUserDetail(user).subscribe(
            result => {
                if (result.code == 200) {
                    this.detailData = result.data;
                    jQuery('#userDetail').modal('show');
                }
            }
        )
    }
}