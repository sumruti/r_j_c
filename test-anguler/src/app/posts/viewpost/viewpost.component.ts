import { Component, OnInit, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../../app.config";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ViewsService } from '../../posts/viewpost/viewpost.service';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { PagesComponent } from '../../pages/pages.component';

@Component({
    selector: 'viewpost',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./viewpost.component.scss'],
    templateUrl: './viewpost.component.html',
    providers: [ViewsService]
})
export class ViewsComponent implements OnInit {
    public rowsOnPage = 10;
    public p = 0;
    sub: any;
    postId: any;
    viewsData: any = [];
    detailData: any;
    msg = false;

    constructor(private route: ActivatedRoute, private _viewservice: ViewsService, private router: Router, vcRef: ViewContainerRef, public _isAdmin: PagesComponent) {

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
        this._viewservice.getViews(this.postId, this.rowsOnPage, this.p).subscribe(
            result => {
                // this.viewsData = result.data;
                if (result.data && result.data.length > 0) {
                    if (result.data.length < 10) {
                        jQuery("#loadButton").hide();
                    } else {
                        jQuery("#loadButton").show();
                    }
                    this.msg = false;
                    result.data.forEach(element => {
                        this.viewsData.push(element);
                    });
                    this.p = this.p + this.rowsOnPage;
                } else {
                    jQuery("#loadButton").hide();
                    this.msg = true;
                }

            }
        )
    }

    gotoUserDatail(user) {
        // console.log("user",user)
        this._viewservice.getUserDetail(user).subscribe(
            result => {
                if (result.code == 200) {
                    this.detailData = result.data;
                    jQuery('#userDetail').modal('show');
                }
            }
        )
    }
}