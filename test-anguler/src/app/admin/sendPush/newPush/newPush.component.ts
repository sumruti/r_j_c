import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../../../app.config";
import { Router } from '@angular/router';
import { newPushService } from './newPush.service';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { PagesComponent } from '../../../pages/pages.component';

declare var swal: any;
@Component({
    selector: 'newPush',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./newPush.component.scss'],
    templateUrl: './newPush.component.html',
    providers: [newPushService]
})

export class newPushComponent {
    pushForm: FormGroup;
    autocomplete: any;
    msg: any = false;
    place: any;
    lat: any;
    long: any;
    cityName: any;
    cautocomplete: any;
    cplace: any;
    clat: any;
    clong: any;
    unitType = 'KM';
    pushType = 'city';
    errMsg = '';
    public count: any;
    rowsOnPage = 30;
    public p = 1;
    userPush = [];
    userData = [];
    public usersList: any = [];
    userSelect = [];




    constructor(private _appConfig: AppConfig, private _service: newPushService, private router: Router, vcRef: ViewContainerRef, fb: FormBuilder, public _isAdmin: PagesComponent) {
        this.pushForm = fb.group({
            'title': ['', Validators.required],
            'message': ['', Validators.required]
        });
    }
    ngOnInit() {
        if (this._isAdmin.isAdmin == false) {
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for (var x in roleDt) {
                if (x == 'push-notification') {
                    if (roleDt[x] == 0) {
                        this.router.navigate(['error']);
                    } else if (roleDt[x] == 100) {
                        jQuery(".runPushBtn").hide();
                    }
                }
            }
        }

        jQuery("#countryTxt").hide(); jQuery("#tableDiv").hide();
        jQuery("#loader").hide();

        this.autocomplete = new google.maps.places.Autocomplete((<HTMLInputElement>document.getElementById('cityTxt')), { types: ['(cities)'] });
        this.autocomplete.addListener('place_changed', () => {
            this.place = this.autocomplete.getPlace();
            this.lat = this.place.geometry.location.lat();
            this.long = this.place.geometry.location.lng();
            for (var i = 0; i < this.place.address_components.length; i += 1) {
                var addressObj = this.place.address_components[i];
                for (var j = 0; j < addressObj.types.length; j += 1) {
                    if (addressObj.types[j] === 'locality') {
                        this.cityName = addressObj.long_name;
                    }
                }
            }
        });


        this.cautocomplete = new google.maps.places.Autocomplete((<HTMLInputElement>document.getElementById('countryTxt')));
        this.cautocomplete.addListener('place_changed', () => {
            this.cplace = this.cautocomplete.getPlace();
            this.clat = this.cplace.geometry.location.lat();
            this.clong = this.cplace.geometry.location.lng();
            for (var i = 0; i < this.cplace.address_components.length; i += 1) {
                var addressObj = this.cplace.address_components[i];
                for (var j = 0; j < addressObj.types.length; j += 1) {
                    if (addressObj.types[j] === 'country') {
                        this.cityName = addressObj.long_name;
                    }
                }
            }
        });
    }
    radioBtn() {
        if (this.pushType == "city") {
            jQuery("#cityTxt").show();
            jQuery("#countryTxt").hide();
            jQuery("#countryTxt").val('');
        } if (this.pushType == "country") {
            jQuery("#cityTxt").hide();
            jQuery("#cityTxt").val('');
            jQuery("#countryTxt").show();
        }
    }
    goForTargetUser1() {
        this.goForTargetUser(this.p);

    }
    goForTargetUser(p) {
        this.userSelect = [];
        jQuery("#loader").show();
        if (this.pushType == "city") {
            var city = jQuery("#cityTxt").val();
            var radius = jQuery("#radius").val();
            if (city.length == 0) {
                this.errMsg = 'City Name';
            } else if (radius.length == 0) {
                this.errMsg = 'Radius';
            } else {
                jQuery("#err").hide();
                this._service.getTargetUser(p - 1, this.rowsOnPage, this.lat, this.long, this.cityName, radius, this.unitType).subscribe(
                    res => {
                        this.userPush = [];
                        this.count = 0;
                        if (res.code == 200) {
                            jQuery('#hCheck').prop('checked', false);
                            jQuery('#rCheck').prop('checked', false);
                            jQuery("#loader").hide();
                            if (res.data && res.data.length > 0) {
                                jQuery("#tableDiv").show();
                                jQuery("#sendBtn").show();
                                this.msg = false;
                                this.userData = res.data;
                                this.count = res.count;
                                this.p = p;
                                this.userData.forEach(element => {
                                    var users = {
                                        pushToken: element.pushToken,
                                        userId: element.userId,
                                        username: element.username,
                                        phoneNumber: element.phoneNumber,
                                        city: element.city
                                    }
                                    this.userPush.push(users);
                                });
                            } else {
                                this.msg = true;
                                this.userPush = [];
                                jQuery("#tableDiv").show(); jQuery("#sendBtn").hide(); jQuery("#loader").hide();
                            }
                        } else {
                            jQuery("#tableDiv").show(); jQuery("#sendBtn").hide(); jQuery("#loader").hide();
                            this.msg = true;
                            this.userPush = [];
                        }
                    }
                )
            }
        } else if (this.pushType == "country") {
            var country = jQuery("#countryTxt").val();
            var radius = jQuery("#radius").val();
            if (country.length == 0) {
                this.errMsg = 'Country Name';
            } else if (radius.length == 0) {
                this.errMsg = 'Radius';
            } else {
                jQuery("#err").hide();
                this._service.getTargetUser(p - 1, this.rowsOnPage, this.clat, this.clong, this.cityName, radius, this.unitType).subscribe(
                    res => {
                        this.userPush = []; this.count = 0;
                        if (res.code == 200) {
                            jQuery("#loader").hide();
                            if (res.data && res.data.length > 0) {
                                jQuery("#tableDiv").show();
                                jQuery("#sendBtn").show();
                                this.msg = false;
                                this.userData = res.data;
                                this.count = res.count;
                                this.p = p;
                                this.userData.forEach(element => {
                                    var users = {
                                        pushToken: element.pushToken,
                                        userId: element.userId,
                                        username: element.username,
                                        phoneNumber: element.phoneNumber,
                                        city: element.city
                                    }
                                    this.userPush.push(users);
                                });
                            } else {
                                this.msg = true;
                                this.userPush = [];
                                jQuery("#tableDiv").show(); jQuery("#sendBtn").hide(); jQuery("#loader").hide();
                            }
                        } else {
                            jQuery("#tableDiv").show(); jQuery("#sendBtn").hide(); jQuery("#loader").hide();
                            this.msg = true;
                            this.userPush = [];
                        }
                    }
                )
            }
        }
    }
    selectAllCheckBox() {
        this.userSelect = [];
        this.userPush.forEach((item) => {
            item.checked = !item.checked;
            this.gotocheck(item.username, item.pushToken, event);
        });
    }
    gotocheck(username, pushToken, event) {
        var dt = {
            username: username,
            pushToken: pushToken
        };
        if (event.target.checked) {
            this.userSelect.push(dt);
        } else if (!event.target.checked) {
            let indexx = this.userSelect.indexOf(dt);
            this.userSelect.splice(indexx, 1);
        }
        // console.log("this", this.userSelect);
    }
    sendPush(val) {
        if (this.userSelect.length == 0) {
            swal("Please Select User");
        } else {
            val._value.user = this.userSelect;
            val._value.locationType = this.pushType;
            val._value.place = this.cityName;
            this._service.sendPushLocation(val._value).subscribe(
                res => {
                    jQuery("#tableDiv").hide();
                    this.userPush = [];
                    this.pushForm.reset();
                    jQuery('#sendPush').modal('hide');
                    swal("Success!", "Sent Successfully!", "success");
                }
            )
        }
    }
}