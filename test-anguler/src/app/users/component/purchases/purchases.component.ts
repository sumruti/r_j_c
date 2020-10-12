import { Component, OnInit, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../../../app.config";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PurchaseService } from './purchases.service';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { PagesComponent } from '../../../pages/pages.component';

@Component({
    selector: 'purchases',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./purchases.component.scss'],
    templateUrl: './purchases.component.html',
    providers: [PurchaseService]
})
export class PurchasesComponent implements OnInit {
    public rowsOnPage = 10;
    public p = 0;
    sub: any;
    userName: any;
    purchesesData: any = [];
    detailData: any;
    public searchEnabled = 0;
    public searchTerm = '';
    msg = false;

    constructor(private route: ActivatedRoute, private _purcheseservice: PurchaseService, private router: Router, vcRef: ViewContainerRef,public _isAdmin: PagesComponent) {
        jQuery(document).ready(function () {
            jQuery('[data-toggle="tooltip"]').tooltip();
        });
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
        this.p = 0;
        this.getPage();

    }
    getPage() {
        this._purcheseservice.getAllPurchases(this.userName, this.p, this.rowsOnPage, this.searchEnabled, this.searchTerm).subscribe(
            result => {
                // console.log("result", result);
                if (result.data && result.data.length > 0) {
                    if (result.data.length < 10) {
                        jQuery("#loadButton").hide();
                    } else {
                        jQuery("#loadButton").show();
                    }
                    this.msg = false;
                    // console.log("result", result);
                    result.data.forEach(element => {
                        this.purchesesData.push(element);
                    });
                    this.p = this.p + this.rowsOnPage;
                } else {
                    this.purchesesData = [];
                    jQuery("#loadButton").hide();
                    this.msg = true;
                }
                // this.p = p;
            }
        )
    }
    gotoUserDatail(user) {
        // console.log("user",user)
        this._purcheseservice.getUserDetail(user).subscribe(
            result => {
                if (result.code == 200) {
                    this.detailData = result.data;
                    jQuery('#userDetail').modal('show');
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
        this.p = 0;
        this.purchesesData = [];
        this.getPage();

    }
    gotoViewDetail(id, username) {
        this.router.navigate(['/app/registered-users/offers/details', id, username]);

    }
}