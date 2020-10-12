import { Component, OnInit, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../../app.config";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FavoriteService } from '../../posts/favorite/favorite.service';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { PagesComponent } from '../../pages/pages.component';

@Component({
    selector: 'favorite',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./favorite.component.scss'],
    templateUrl: './favorite.component.html',
    providers: [FavoriteService]
})
export class FavoriteComponent implements OnInit {
    public rowsOnPage = 10;
    public p = 0;
    sub: any;
    postId: any;
    favoriteData: any = [];
    type: any;
    detailData: any;
    msg = false;

    constructor(private route: ActivatedRoute, private _favoriteservice: FavoriteService, private router: Router, vcRef: ViewContainerRef, public _isAdmin: PagesComponent) {

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
            this.type = params['type'];
        });

        // this.p = 1;
        this.getPage();
    }

    getPage() {
        this._favoriteservice.getFavorite(this.postId, this.type, this.rowsOnPage, this.p).subscribe(
            result => {
                // this.favoriteData = result.data;
                // console.log(result);
                if (result.data && result.data.length > 0) {
                    if (result.data.length < 10) {
                        jQuery("#loadButton").hide();
                    } else {
                        jQuery("#loadButton").show();
                    }
                    this.msg = false;
                    result.data.forEach(element => {
                        this.favoriteData.push(element);
                    });
                    this.p += this.rowsOnPage;
                } else {
                    jQuery("#loadButton").hide();
                    this.msg = true;
                }
            }
        )
    }
    gotoUserDatail(user) {
        // console.log("user",user)
        this._favoriteservice.getUserDetail(user).subscribe(
            result => {
                if (result.code == 200) {
                    this.detailData = result.data;
                    jQuery('#userDetail').modal('show');
                }
            }
        )
    }
}