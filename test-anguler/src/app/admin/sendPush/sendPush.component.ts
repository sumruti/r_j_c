import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../../app.config";
import { Router } from '@angular/router';
import { sendPushService } from './sendPush.service';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { PagesComponent } from '../../pages/pages.component';
declare var swal: any;
@Component({
    selector: 'sendPush',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./sendPush.component.scss'],
    templateUrl: './sendPush.component.html',
    providers: [sendPushService]
})

export class SendPushComponent {
    public rowsOnPage = 10;
    public p = 1;
    msg: any = false;
    data: any = [];
    selectUser = [];
    constructor(private _appConfig: AppConfig, private _service: sendPushService, private router: Router, vcRef: ViewContainerRef, fb: FormBuilder, public _isAdmin: PagesComponent) { }
    ngOnInit() {
        if (this._isAdmin.isAdmin == false) {
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for (var x in roleDt) {
                if (x == 'push-notification') {
                    if (roleDt[x] == 0) {
                        this.router.navigate(['error']);
                    } else if (roleDt[x] == 100) {
                        jQuery(".runPushBtn").hide();
                    } else if (roleDt[x] == 110) {
                        jQuery("#dltBtn").hide();
                    }
                }
            }
        }
        this.selectUser = [];
        this._service.getPushData().subscribe(
            res => {
                if (res.data && res.data.length > 0) {
                    this.data = res.data;
                    this.msg = false;
                } else {
                    this.data = [];
                    this.msg = true;
                }
            }
        )
    }
    gotocheck(id, event) {
        if (event.target.checked) {
            this.selectUser.push(id);
        } else if (!event.target.checked) {
            let indexx = this.selectUser.indexOf(id);
            this.selectUser.splice(indexx, 1);
        }
    }
    gotoDeleteNotification() {
        if (this.selectUser.length == 0) {
            swal("Please Select User");
        } else {
            var push = this;
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this Notification!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yes, I am sure!',
                cancelButtonText: "No, cancel it!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
                function (isConfirm) {
                    if (isConfirm) {
                        push.deleteNotification();
                        swal({
                            title: 'Delete!',
                            text: 'Notification Deleted Successfully!',
                            type: 'success'
                        });

                    } else {
                        swal("Cancelled", "Your Notification is safe :)", "error");
                    }
                });
        }
    }
    deleteNotification() {
        this._service.deletePush(this.selectUser).subscribe(
            res => {
                this.ngOnInit();
            }
        )
    }
    gotoResendNotification(id) {
        this._service.resendNotification(id).subscribe(
            res => {
                swal("Success!", "Sent Successfully!", "success");
            }
        )
    }
    sendNewPush() {
        this.router.navigate(['/app/push-notification/send-new-notification']);
    }
    gotoTargetedUser(id) {
        this.router.navigate(['/app/push-notification/targeted-users', id]);
    }
}