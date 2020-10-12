import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewContainerRef, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { DeviceService } from './device.service';
import { Location } from '@angular/common';
import { PagesComponent } from '../pages/pages.component';


@Component({
    selector: 'device',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./devices.component.scss'],
    templateUrl: './devices.component.html',
    providers: [DeviceService]

})

export class DeviceComponent implements OnInit {
    sub: any;
    username: any;
    deviceData: any = [];
    msg: any = false;
    constructor(private route: ActivatedRoute, private _deviceService: DeviceService, private router: Router, vcRef: ViewContainerRef, public _isAdmin: PagesComponent) {

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
            this.username = params['username'];
        });

        // console.log("name", this.username);
        this._deviceService.getDevice(this.username).subscribe(
            result => {
                // console.log("device",result);
                if (result.data.length > 0) {
                    this.deviceData = result.data;
                    // console.log("device data", result.data.length);
                } else {
                    this.msg = "No devices available";
                }
            }
        )
    }


    // ngOnDestroy() {
    //     this.sub.unsubscribe();
    // }
}