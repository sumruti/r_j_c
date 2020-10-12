import { Component, OnInit, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../../../app.config";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserFollowerService } from '../userfollowers/userfollowers.service';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { PagesComponent } from '../../../pages/pages.component';


@Component({
    selector: 'userfollowers',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./userfollowers.component.scss'],
    templateUrl: './userfollowers.component.html',
    providers: [UserFollowerService]
})
export class UserFollowersComponent implements OnInit {
    public rowsOnPage = 10;
    public p = 1;
    sub: any;
    userName: any;
    followersData: any;
    detailData:any;

    constructor(private route: ActivatedRoute, private _userfollowers: UserFollowerService, private router: Router, vcRef: ViewContainerRef,public _isAdmin: PagesComponent) {

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
            this.userName = params['username'];
        });
        // console.log("sd",this.userName);
        this._userfollowers.getFollowers(this.userName).subscribe(
            result => {
                this.followersData = result.data;
                // console.log("result",result);
            }
        )
    }
    gotoUserDatail(user) {
        this._userfollowers.getUserDetail(user).subscribe(
            result => {
                if (result.code == 200) {
                    this.detailData = result.data;
                    jQuery('#userDetail').modal('show');
                }
            }
        )
    }
}

