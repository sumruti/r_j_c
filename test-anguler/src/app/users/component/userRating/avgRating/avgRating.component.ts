import { Component, OnInit, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../../../../app.config";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { UserRatingService } from '../userRating.service';
import { PagesComponent } from '../../../../pages/pages.component';


@Component({
    selector: 'avgRating',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./avgRating.component.scss'],
    templateUrl: './avgRating.component.html',
    providers: [UserRatingService]
})
export class UserAvgRatingComponent {
    public rowsOnPage = 10;
    public p = 0;
    rateData: any = [];
    msg = false;
    detailData: any;
    sub: any;
    username: any;

    constructor(private route: ActivatedRoute, private _service: UserRatingService, private router: Router, vcRef: ViewContainerRef,public _isAdmin: PagesComponent) { }
    ngOnInit() {
        if(this._isAdmin.isAdmin == false){
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for(var x in roleDt){
                if(x == 'registered-users'){
                    if(roleDt[x] == 0){
                        this.router.navigate(['error']);                                    
                    } 
                }
            }
         }

        this.sub = this.route.params.subscribe(params => {
            this.username = params['username'];
        });
        this.getPage();
    }
    getPage() {
        this._service.getUseravgRating(this.rowsOnPage, this.p, this.username).subscribe(
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
                        this.rateData.push(element);
                    });
                    this.p = this.p + this.rowsOnPage;
                } else {
                    this.msg = true;
                    this.rateData = [];
                }
            }
        )
    }
    gotoUserDatail(user) {
        // console.log("user",user)
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