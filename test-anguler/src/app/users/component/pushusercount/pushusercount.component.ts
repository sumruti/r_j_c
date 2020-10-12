import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewContainerRef, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { PushUserCountService } from './pushusercount.service';
import { Location } from '@angular/common';
import { PagesComponent } from '../../../pages/pages.component';


declare var swal: any;


@Component({
    selector: 'pushusercount',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./pushusercount.component.scss'],
    templateUrl: './pushusercount.component.html',
    providers: [PushUserCountService]

})
export class PushUserCountComponent implements OnInit {
    detailData: any;
    public rowsOnPage = 10;
    public p = 1;
    pushData: any;
    pushId: any;
    sub: any;
    constructor(private route: ActivatedRoute, private _service: PushUserCountService, private router: Router, vcRef: ViewContainerRef,public _isAdmin: PagesComponent) {

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
            this.pushId = params['pushId'];
        });
        this.getPage();
    }
    getPage() {
        this._service.getPushUsersCount(this.pushId).subscribe(
            result => {
                this.pushData = result.data;
                // console.log("result", result);
            }
        )
    }
    gotoUserDatail(user) {
        this._service.getUserDetail(user).subscribe(
            result => {
                if (result.code == 200) {
                    this.detailData = result.data;
                    jQuery('#userDetail').modal('show');
                }
            }
        )
    }
}