import { Component, OnInit, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../../../app.config";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OfferDetailService } from '../offerdetail.service';

import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { PagesComponent } from '../../../pages/pages.component';


@Component({
    selector: 'offerview',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./offerview.component.scss'],
    templateUrl: './offerview.component.html',
    providers: [OfferDetailService]
})
export class OfferPostComponent implements OnInit {
    sub: any;
    postId: any;
    public rowsOnPage = 10;
    public p = 0;
    msg = false;
    offerDetail = [];

    constructor(private route: ActivatedRoute, private _service: OfferDetailService, private router: Router, vcRef: ViewContainerRef, public _isAdmin: PagesComponent) {

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
        this.p = 0;
        this.getPage();
    }
    getPage() {

        this._service.getOfferView(this.postId, this.p, this.rowsOnPage).subscribe(
            res => {
                // console.log("res", res);
                if (res.data && res.data.length > 0) {
                    if (res.data.length < 10) {
                        jQuery("#loadButton").hide();
                    } else {
                        jQuery("#loadButton").show();
                    }
                    this.msg = false;
                    res.data.forEach(element => {
                        this.offerDetail.push(element);
                    });
                    this.p = this.p + this.rowsOnPage;
                } else {
                    this.offerDetail = [];
                    this.msg = true;
                }
            }
        )
    }

}