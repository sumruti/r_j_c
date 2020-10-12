import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from "../../app.config";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { GuestUserService } from './guestUser.service';
import { PagesComponent } from '../../pages/pages.component';

@Component({
    selector: 'guest',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./guestUser.component.scss'],
    templateUrl: './guestUser.component.html',
    providers: [GuestUserService]
})

export class GuestUserComponent {
    public guestUser: any;
    public count: any;
    public p = 1;
    public totalPages: any;
    public rowsOnPage = 10;
    public nameascending = false;
    public sortCondition = 'nameasc';


    constructor(private _appConfig: AppConfig, private _guestuserservice: GuestUserService, private router: Router,public _isAdmin: PagesComponent) { }

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
        this.getPage(this.p);
        // this._guestuserservice.getGuestUser().subscribe(
        //     result => {
        //         console.log(result);
        //         this.guestUser = result.success;
        //         this.count = this.guestUser.length;
        //         console.log("count", this.guestUser.length)
        //     }

        // )
        
    }

    getPage(p) {
        // console.log("page", p);
        // console.log("ngmodel", this.rowsOnPage);
        // this.limit = 100;
        this._guestuserservice.getGuestUser(p - 1, this.rowsOnPage, this.sortCondition).subscribe(
            (result) => {
                // console.log(result);
                this.guestUser = result.data;
                this.p = p;
                this.count = result.count;
                // console.log("data", this.guestUser);
                // console.log("total" + this.count);
            }
        );
    }
    getSort(sort) {
        // console.log("abc");
        switch (sort) {
            case 'lastlogin': this.nameascending = !this.nameascending;
                this.sortCondition = (this.nameascending) ? 'nameasc' : 'namedesc';
                this.getPage(this.p);
                // console.log("sort",this.sortCondition);
                break;
            // case 'date': this.nameascending = !this.nameascending;
            //     this.sortCondition = (this.nameascending) ? 'nameasc' : 'namedesc';
            //     this.getPage(this.p);
            //     // console.log("sort",this.sortCondition);
            //     break;
        }

    }

}
