import { Component, OnInit, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../../app.config";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostStatusService } from '../../posts/status/status.service';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { PagesComponent } from '../../pages/pages.component';

@Component({
    selector: 'status',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./status.component.scss'],
    templateUrl: './status.component.html',
    providers: [PostStatusService]
})

export class PostStatusComponent implements OnInit {
    sub: any;
    postId
    public rowsOnPage = 10;
    public p = 1;
    msg: any = false;
    detailData: any;
    statusData: any = [];
    constructor(private route: ActivatedRoute, private _poststatusservice: PostStatusService, private router: Router, vcRef: ViewContainerRef, public _isAdmin: PagesComponent) {

    }
    ngOnInit() {
        if (this._isAdmin.isAdmin == false) {
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for (var x in roleDt) {
                if (x == 'active-post') {
                    if (roleDt[x] == 0) {
                        this.router.navigate(['error']);
                    }
                }
            }
        }

        this.sub = this.route.params.subscribe(params => {
            this.postId = params['postId'];
        });
        this._poststatusservice.getPoststatus(this.postId).subscribe(
            result => {
                // console.log("result", result);

                if (result.data && result.data.length > 0) {
                    // console.log("length", result.data.length);
                    this.statusData = result.data;
                } else {
                    this.statusData = [];
                    this.msg = "No Detail Available";
                }

            }
        )
    }
    gotoUserDatail(user) {
        // console.log("user",user)
        this._poststatusservice.getUserDetail(user).subscribe(
            result => {
                if (result.code == 200) {
                    this.detailData = result.data;
                    jQuery('#userDetail').modal('show');
                }
            }
        )
    }
}