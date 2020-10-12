import { Component, OnInit, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../../app.config";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OfferDetailService } from './offerdetail.service';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { PagesComponent } from '../../pages/pages.component';

@Component({
    selector: 'offerdetail',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./offerdetail.component.scss'],
    templateUrl: './offerdetail.component.html',
    providers: [OfferDetailService]
})
export class OfferDetailComponent implements OnInit {
    public rowsOnPage = 10;
    public p = 1;
    sub: any;
    postId: any;
    offerData: any = [];
    msg: any = false;
    detailData: any;
    public searchEnabled = 0;
    public searchTerm = '';

    constructor(private route: ActivatedRoute, private _offerdetailservice: OfferDetailService, private router: Router, vcRef: ViewContainerRef,public _isAdmin: PagesComponent) {

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
        this.getPage();

    }
    getPage() {
        this._offerdetailservice.getOffer(this.postId, this.searchEnabled, this.searchTerm).subscribe(
            result => {
                if (result.data && result.data.length > 0) {
                    this.msg = false;
                    this.offerData = result.data;
                } else {
                    this.msg = true;
                    this.offerData = [];
                }
            }
        )
    }
    getPageOnSearch(term) {
        this.searchTerm = term;
        if (this.searchTerm.length > 0) {
            this.searchEnabled = 1;
        } else {
            this.searchEnabled = 0;
        }
        this.p = 0;
        this.offerData = [];
        this.getPage();

    }
    gotoUserDatail(user) {
        // console.log("user",user)
        this._offerdetailservice.getUserDetail(user).subscribe(
            result => {
                if (result.code == 200) {
                    this.detailData = result.data;
                    jQuery('#userDetail').modal('show');
                }
            }
        )
    }
    gotoViewDetail(id) {
        this.router.navigate(['/app/active-post/offer/offer-detail', id]);
    }
}