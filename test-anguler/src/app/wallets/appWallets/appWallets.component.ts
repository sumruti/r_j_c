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
    selector: 'appWallets',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./appWallets.component.scss'],
    templateUrl: './appWallets.component.html',
    providers: [WalletService]
})

export class AppWalletsComponent {
    public rowsOnPage = 10;
    public p = 0;
    data = [];
    msg = false;

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
        this._service.getAllAppData(this.rowsOnPage, this.p).subscribe(
            res => {
                // console.log("res", res);
                if (res.data && res.data.length > 0) {
                    var Obalance = 0, Cbalance;
                    if (res.data.length < 10) {
                        jQuery("#loadButton").hide();
                    }
                    res.data.forEach(element => {
                        element.openingBalance = Obalance;
                        Cbalance = Obalance + element.price;
                        element.closingBalance = Cbalance;
                        Obalance = Cbalance;
                        this.data.push(element);
                    });
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
}