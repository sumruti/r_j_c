import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewContainerRef, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { PushMessagesService } from './pushmessages.service';
import { Location } from '@angular/common';
import { PagesComponent } from '../../../pages/pages.component';
declare var swal: any;


@Component({
    selector: 'pushmessages',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./pushmessages.component.scss'],
    templateUrl: './pushmessages.component.html',
    providers: [PushMessagesService]

})
export class PushMessagesComponent {

    public rowsOnPage = 10;
    public p = 1;
    pushData: any = [];
    msg: any = false;
    constructor(private route: ActivatedRoute, private _service: PushMessagesService, private router: Router, vcRef: ViewContainerRef,public _isAdmin: PagesComponent) {

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

        this.getPage();
    }
    getPage() {
        this._service.getPushMessages().subscribe(
            result => {
                if (result.data && result.data.length > 0) {
                    this.pushData = result.data;
                    // console.log("result", result);
                } else {
                    this.pushData = [];
                    this.msg = "No Data Available";
                }
            }
        )
    }
    gotoPushUsers(pushId) {
        this.router.navigate(['/app/push-messages/users', pushId]);
    }
}