import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppConfig } from "../../app.config";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { WalletService } from '../wallets.service';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { PagesComponent } from '../../pages/pages.component';

declare var swal: any;
declare var sweetAlert: any;
@Component({
    selector: 'customerWallets',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./customerWallets.component.scss'],
    templateUrl: './customerWallets.component.html',
    providers: [WalletService]
})

export class CustomerWalletsComponent {
    public rowsOnPage = 10;
    public p = 0;
    data = [];
    msg = false;
    detailData: any;
    

    constructor(private route: ActivatedRoute, private _service: WalletService, private router: Router, vcRef: ViewContainerRef, public _isAdmin: PagesComponent) { }
    ngOnInit() {
        if (this._isAdmin.isAdmin == false) {
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for (var x in roleDt) {
                if (x == 'customer-wallets') {
                    if (roleDt[x] == 0) {
                        this.router.navigate(['error']);
                    }
                }
            }
        }
        
        this.p = 0;

        this.getPage();
    }
    getPage() {
        this._service.getAllCustomerData(this.rowsOnPage, this.p).subscribe(
            res => {
                // console.log("res", res);
                if (res.data && res.data.length > 0) {
                    if(res.data.length < 10){
                        jQuery("#loadButton").hide();
                    }
                    res.data.forEach(element => {
                        this.data.push(element);
                    });
                    // this.data = res.data;
                    this.msg = false;
                    this.p = this.p + this.rowsOnPage;                    
                } else {
                    jQuery("#loadButton").hide();
                    this.msg = true;
                    this.data = [];
                }
            }
        )
    }
    gotoUserDatail(user) {
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