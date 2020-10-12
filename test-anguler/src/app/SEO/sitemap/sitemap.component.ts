import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppConfig } from "../../app.config";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { SeoService } from '../seo.service';
import { PagesComponent } from '../../pages/pages.component';


declare var swal: any;
declare var sweetAlert: any;
@Component({
    selector: 'sitemap',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./sitemap.component.scss'],
    templateUrl: './sitemap.component.html',
    providers: [SeoService]
})

export class SitemapComponent {

    data: any;
    constructor(private route: ActivatedRoute, private _service: SeoService, private router: Router, vcRef: ViewContainerRef, fb: FormBuilder, public _isAdmin: PagesComponent) { }

    ngOnInit() {
        if (this._isAdmin.isAdmin == false) {
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for (var x in roleDt) {
                if (x == 'home') {
                    if (roleDt[x] == 0) {
                        this.router.navigate(['error']);
                    } else if (roleDt[x] == 100 || roleDt[x] == 110) {
                        jQuery(".sitemapBtn").hide();
                    }
                }
            }
        }
        this._service.getXmlFile().subscribe(
            res => {
                console.log("res", res);
                this.data = atob(res.data);
                // this.data = res.data.urlset.url;
            }
        )
    }
    gotosave(){
        var x = jQuery("#saveval").val();
        // var xx = btoa(x);
        this._service.saveXmlFile(x).subscribe(
            res => {
                console.log("res",res);
            }
        )
    }
}