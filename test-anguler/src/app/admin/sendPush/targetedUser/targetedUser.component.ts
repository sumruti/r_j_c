import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../../../app.config";
import { Router, ActivatedRoute } from '@angular/router';
import { pushTargetedUserService } from './targetedUser.service';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { PagesComponent } from '../../../pages/pages.component';
declare var swal: any;
@Component({
    selector: 'targetedUser',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./targetedUser.component.scss'],
    templateUrl: './targetedUser.component.html',
    providers: [pushTargetedUserService]
})

export class pushTargetedUserComponent {
    public rowsOnPage = 10;
    public p = 1;
    msg: any = false;
    data: any = [];
    sub: any;
    pushId: any;
    constructor(private _appConfig: AppConfig, private _service: pushTargetedUserService, private router: Router, vcRef: ViewContainerRef, private route: ActivatedRoute, public _isAdmin: PagesComponent) { }
    ngOnInit() {
        if (this._isAdmin.isAdmin == false) {
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for (var x in roleDt) {
                if (x == 'push-notification') {
                    if (roleDt[x] == 0) {
                        this.router.navigate(['error']);
                    }
                }
            }
        }

        this.sub = this.route.params.subscribe(params => {
            this.pushId = params['id'];
        });

        this._service.getUsers(this.pushId).subscribe(
            res => {
                console.log("res",res);
                if (res.data && res.data[0].targereduser.length > 0) {
                    this.msg = false;
                    this.data = res.data[0].targereduser;
                } else {
                    this.msg = true;
                    this.data = [];
                }
            }
        )
    }
}