import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { AppConfig } from "../../../app.config";
import { Router } from '@angular/router';

//importing service
import { UsersService } from '../../users.service';

import { Modal } from 'angular2-modal/plugins/bootstrap';

import { ModalModule } from "ng2-modal";
//=================== importing form components ==================
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
require("../../../../../node_modules/intl-tel-input");
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { PagesComponent } from '../../../pages/pages.component';
declare var swal: any;
declare var sweetAlert: any;
declare var CLOUDNAME: string, CLOUDPRESET: string;

@Component({
    selector: 'userslist',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./users.component.scss'],
    templateUrl: './users.component.html',
    providers: [UsersService]
})

export class UsersListComponent {
    private notificationM: FormGroup;
    private notificationAll: FormGroup;
    public config: any;
    public configFn: any;
    public usersList: any = [];
    public users: any;
    public userDetails: any;
    public userName: any;
    pushForm: FormGroup;
    allPushForm: FormGroup;
    public data;
    public obj = { name: 'chethan' };
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "registedDate";
    public sortOrder = "asc";
    public usrDetails: any;
    public total: any;
    public iIndex: any;
    pushData: any;
    public editDetails: any;
    public oEmail: AbstractControl;
    public oCity: AbstractControl;
    public message: any;
    // public google: any;
    public placeSearch: any;
    public autocomplete: any;
    public autocomplete1: any;
    public emailMessage: any;
    public emailErr: any;
    public delusername: any;
    public editIndex: any;
    public uid: any;
    public userid: any;
    public errmsg;
    public limit: any;
    public countries: any[];
    public location: any;
    public locc: any;
    public citytxt: any;
    public citytxt1: any;
    public country: any;
    public country1: any;
    public postcode1: any;
    public postcode: any;
    public p = 1;
    state = 1;
    public croppingBoxPush: boolean = false;
    public url: any;
    public rowpage: any;
    public count: any;
    public adminToken: any;
    public addressPlace: any;
    public addressPlace1: any;
    public totalPages: any;
    public searchEnabled = 0;
    public searchTerm = '';
    public nameascending = false;
    public dateascending = false;
    public sortCondition = 'datedesc';
    userReject = [];
    public images: string[] = [];
    pushImgUrl: any;
    rejectedusr: any;
    detailData: any;
    msg: any = false;
    public Type = "intrusive";
    pushTitle: any;
    pushMsg: any;
    pushUrl: any;
    pushTitleA: any;
    pushMsgA: any;
    pushUrlA: any;
    pMsg = 0;
    pMsgA = 0;
    userPushData: any = [];
    showAlert() {
        swal(
            'Success!',
            'User Inserted!',
            'success'
        )
    }
    editAlert() {
        swal(
            'Success!',
            'User updated!',
            'success'
        )
    }


    uploader: CloudinaryUploader = new CloudinaryUploader(
        new CloudinaryOptions({ cloudName: CLOUDNAME, uploadPreset: CLOUDPRESET })
    );

    imageUploader = (item: any, response: string, status: number, headers: any) => {

        let cloudinaryImage = JSON.parse(response);
        this.url = cloudinaryImage.secure_url;
        if (this.state == 1) {
            this.sendPush(this.url);
        } else if (this.state == 0) {
            this.gotoSendAllPush(this.url);
        }
        return { item, response, status, headers };
    };
    constructor(private changeDetectorRef: ChangeDetectorRef, private _appConfig: AppConfig, private _userService: UsersService, private router: Router, vcRef: ViewContainerRef, fb: FormBuilder, public _isAdmin: PagesComponent) {
        this.config = this._appConfig.config;
        this.configFn = this._appConfig;
        this.adminToken = localStorage.getItem('adminToken');
        this.pushForm = fb.group({
            'title': ['', Validators.required],
            // 'contMsg': ['', Validators.required],
            // 'expTitle': ['', Validators.required],
            // 'expMsg': ['', Validators.required],
            // 'Type': "",

        });
        this.allPushForm = fb.group({
            'title': ['', Validators.required],
            // 'contMsg': ['', Validators.required],
            // 'expTitle': ['', Validators.required],
            // 'expMsg': ['', Validators.required],
            // 'Type': "",

        });
        // this.notificationM = fb.group({
        //     // "type": ['', Validators.required],
        //     "line2": ['', Validators.required],
        //     "message": ['', Validators.required],
        //     "image": [''],
        //     "url": [''],
        //     // "numberOfUser": ['']
        // });
        // this.notificationAll = fb.group({
        //     // "type": ['', Validators.required],
        //     "line2": ['', Validators.required],
        //     "message": ['', Validators.required],
        //     "image": [''],
        //     "url": [''],
        //     // "numberOfUser": ['']
        // })
    }
    onChange(value) {
        this.rowpage = value;

    }

    ngOnInit() {
        if (this._isAdmin.isAdmin == false) {
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for (var x in roleDt) {
                if (x == 'registered-users') {
                    if (roleDt[x] == 0) {
                        this.router.navigate(['error']);
                    } else if (roleDt[x] == 100) {
                        jQuery(".Userbtn").hide();
                    } else if (roleDt[x] == 110) {
                        jQuery("#btnreject").hide();
                        jQuery("#btnDlt").hide();
                    }
                }
            }
        }
        this.uploader.onSuccessItem = this.imageUploader;
        this.p = 1;
        this.getPage(this.p);
    }
    ngAfterViewInit() {
        jQuery("#ephone").intlTelInput({
            allowExtensions: false,
            autoFormat: true,
            autoHideDialCode: true,
            autoPlaceholder: true,
            customPlaceholder: null,
            defaultCountry: "in",
            geoIpLookup: null,
            nationalMode: true,
            numberType: "MOBILE",
            onlyCountries: undefined,
            preferredCountries: ['in', 'us', 'gb'],
            skipUtilScriptDownload: false,
            utilsScript: "../../../../../node_modules/intl-tel-input/build/js/utils.js",
        });
        jQuery("#phone").intlTelInput({
            allowExtensions: false,
            autoFormat: true,
            autoHideDialCode: true,
            autoPlaceholder: true,
            customPlaceholder: null,
            defaultCountry: "in",
            geoIpLookup: null,
            nationalMode: true,
            numberType: "MOBILE",
            onlyCountries: undefined,
            preferredCountries: ['in', 'us', 'gb'],
            skipUtilScriptDownload: false,
            utilsScript: "../../../../../node_modules/intl-tel-input/build/js/utils.js",

        });
        jQuery("#shipPhone").intlTelInput();
        jQuery('#billPhone').intlTelInput();
    }

    getPage(p) {
        // console.log("page", p);
        // console.log("ngmodel", this.rowsOnPage);
        // this.limit = 100;
        jQuery('#hCheck').prop('checked', false);
        this._userService.getusersList(p - 1, this.rowsOnPage, this.searchEnabled, this.searchTerm, this.sortCondition).subscribe(
            (result) => {
                // console.log("res", result);
                if (result.response && result.response.length > 0) {
                    this.msg = false;
                    this.usersList = result.response;
                    this.p = p;
                    this.count = result.count;
                    // console.log("result", result);
                } else {
                    this.usersList = [];
                    this.msg = "No Users Available";
                }

            }
        );
    }
    getPageOnSearch(term) {
        this.searchTerm = term;
        if (this.searchTerm.length > 0) {
            this.searchEnabled = 1;
        } else {
            this.searchEnabled = 0;
        }
        this.getPage(this.p);

    }

    getSort(sort) {
        switch (sort) {
            case 'name': this.nameascending = !this.nameascending;
                this.sortCondition = (this.nameascending) ? 'nameasc' : 'namedesc';
                this.getPage(this.p);
                break;
            case 'date': this.dateascending = !this.dateascending;
                this.sortCondition = (this.dateascending) ? 'dateasc' : 'datedesc';
                this.getPage(this.p);
                break;
        }

    }

    gotoDevices(username: any) {
        this.router.navigate(['/app/registered-users/devices', username]);
    }
    gotoPost(username: any) {
        this.router.navigate(['/app/registered-users/post', username]);
    }
    gotocheck(username, event) {
        // jQuery("#btnreject").show();
        if (event.target.checked) {
            this.userReject.push(username);
        } else if (!event.target.checked) {
            let indexx = this.userReject.indexOf(username);
            this.userReject.splice(indexx, 1);
        }
        if (this.userReject.length == 0) {
            // jQuery("#btnreject").hide();
            // swal("Please Select User");
        }
        // console.log("element", this.userReject);

    }
    gotoRejectUser() {
        if (this.userReject.length == 0) {
            // jQuery("#btnreject").hide();
            swal("Please Select User");
        } else {
            this._userService.rejectUser(this.userReject).subscribe(
                result => {
                    this.rejectedusr = result;
                    // console.log("rejec", this.rejectedusr);
                    swal("Success!", "User Rejected Successfully", "success");
                    this.ngOnInit();
                    jQuery('#hCheck').prop('checked', false);
                    jQuery('#rCheck').prop('checked', false);

                }
            )
        }
    }
    // confirmUploadPush() {
    //     // console.log(this.images);
    //     this._userService.uploadPushImage(this.images).subscribe(
    //         res => {
    //             this.pushImgUrl = res.data;
    //             // console.log("res", this.pushImgUrl);
    //         }
    //     )
    // }
    // pushUsers(value) {
    //     if (value._value.line2.length > 0 && value._value.message.length > 0) {
    //         this.pMsg = 1;
    //         this.pushTitle = value._value.line2;
    //         this.pushMsg = value._value.message;
    //         this.pushUrl = value._value.url;
    //         jQuery('#detailsBoxPush').modal('hide');

    //     } else {
    //         this.pMsg = 0;
    //     }
    // }
    // sendNotification() {
    //     if (this.userReject.length == 0) {
    //         swal("Please Select User");
    //     } else {
    //         this._userService.adminPushNotification(this.pushTitle, this.pushMsg, this.pushUrl, this.pushImgUrl, this.userReject).subscribe(
    //             res => {
    //                 if (res.code == 200) {
    //                     this.notificationM.reset();
    //                     this.ngOnInit();
    //                     this.images = [];
    //                     jQuery('#sendPush').modal('hide');
    //                     swal("Success!", "Notification Sent Successfully!", "success");

    //                 } else {
    //                     sweetAlert("Oops...", "Something went wrong!", "error");

    //                 }
    //             }
    //         )

    //     }

    // }
    // AllpushUsers(value) {
    //     if (value._value.line2.length > 0 && value._value.message.length > 0) {
    //         this.pMsgA = 1;
    //         this.pushTitleA = value._value.line2;
    //         this.pushMsgA = value._value.message;
    //         this.pushUrlA = value._value.url;
    //         jQuery('#detailsBoxAllPush').modal('hide');

    //     } else {
    //         this.pMsgA = 0;
    //     }
    // }
    // sendNotificationAll() {
    //     // console.log("pushTitleA", this.pushTitleA);
    //     // console.log("pushMsgA", this.pushMsgA);
    //     // console.log("pushUrlA", this.pushUrlA);
    //     // console.log("pushImgUrl", this.pushImgUrl);
    //     this._userService.sendToAllNotification(this.pushTitleA, this.pushMsgA, this.pushUrlA, this.pushImgUrl).subscribe(
    //         res => {
    //             if (res.code == 200) {
    //                 this.notificationAll.reset();
    //                 this.ngOnInit();
    //                 this.images = [];
    //                 jQuery('#sendAllPush').modal('hide');
    //                 swal("Success!", "Notification Sent Successfully!", "success");

    //             } else {
    //                 sweetAlert("Oops...", "Something went wrong!", "error");

    //             }
    //         }
    //     )

    // }
    gotoDeleteUser() {
        if (this.userReject.length == 0) {
            swal("Please Select User");
        } else {
            // console.log(this.userReject);
            this._userService.gotoDeleteUser(this.userReject).subscribe(
                result => {
                    if (result.code == 200) {
                        this.ngOnInit();
                        swal("Success!", "User Deleted!", "success");
                        jQuery('#hCheck').prop('checked', false);
                        jQuery('#rCheck').prop('checked', false);
                    }
                }
            )
        }
    }
    gotoSendPush(val) {
        this.pushData = val._value;
        let photo = jQuery("#photo").val();
        if (photo) {
            this.state = 1;
            this.uploader.uploadAll();
        } else {
            this.sendPush(this.url);
        }
    }
    gotoSendAllPush(val) {
        this.pushData = val._value;
        let photo = jQuery("#allPhoto").val();
        if (photo) {
            this.state = 0;
            this.uploader.uploadAll();
        } else {
            this.sendAllPush(this.url);
        }
    }
    sendPush(data) {
        if (this.userReject.length == 0) {
            // jQuery("#btnreject").hide();
            swal("Please Select User");
        } else {
            data._value.users = this.userReject;
            this._userService.sendPush(data._value).subscribe(
                result => {
                    // console.log("result", result);
                    swal("Success!", "Notification Sent Successfully!", "success");                    
                    // if (result.code == 200) {
                    // } else {
                    //     sweetAlert("Oops...", "Something went wrong!", "error");
                    // }
                    this.userReject = [];
                    jQuery('#sendPush').modal('hide');
                    this.ngOnInit();
                    this.pushForm.reset();
                    jQuery('#hCheck').prop('checked', false);
                    jQuery('#rCheck').prop('checked', false);
                }
            )
        }
    }
    UploadImgPush() {
        this.croppingBoxPush = true;
        jQuery('#croppingBoxPush').modal('show')
    }
    // notificationPic(value) {
    //     if (value == null || value == "" || value == "string") {
    //         return "assets/img/users/bg_img.png"

    //     }
    //     return value;
    // }
    fileChange(input) {
        this.readFiles(input.files);
    }
    readFile(file, reader, callback) {
        reader.onload = () => {
            callback(reader.result);
        }
        reader.readAsDataURL(file);
    }
    readFiles(files, index = 0) {
        let reader = new FileReader();

        if (index in files) {
            this.readFile(files[index], reader, (result) => {
                this.images.push(result);
                this.readFiles(files, index + 1);
            });
        } else {
            this.changeDetectorRef.detectChanges();
        }
        // console.log(this.images);

    }
    removeImage(index): void {
        this.images.splice(index, 1);
    }
    sendAllPush(data) {
        this._userService.sendPushToAll(data._value).subscribe(
            result => {
                // if (result.code == 200) {
                //     swal("Success!", "Notification Sent Successfully!", "success");
                // } else {
                //     sweetAlert("Oops...", "Something went wrong!", "error");
                // }
                swal("Success!", "Notification Sent Successfully!", "success");                
                jQuery('#sendAllPush').modal('hide');
                this.ngOnInit();
                this.allPushForm.reset();
            }
        )
    }
    selectAllCheckBox() {
        this.usersList.forEach((user) => {
            user.checked = !user.checked;
            this.gotocheck(user.username, event);
        });
    }
    closeModal() {
        jQuery('#sendPush').modal('hide');
        jQuery('#sendAllPush').modal('hide');

    }
    gotoWishlist(username) {
        this.router.navigate(['/app/registered-users/wishlist', username]);
    }
    gotoFollowers(username) {
        this.router.navigate(['/app/registered-users/followers', username]);
    }
    gotofollowing(username) {
        this.router.navigate(['/app/registered-users/following', username]);
    }
    gotoPurchases(username) {
        this.router.navigate(['/app/registered-users/offers', username]);
    }
    gotoUserDatail(user) {
        this._userService.getUserDetail(user).subscribe(
            result => {
                if (result.code == 200) {
                    this.detailData = result.data;
                    jQuery('#userDetail').modal('show');
                }
            }
        )
    }


}

export function emailValidator(control: FormControl): { [key: string]: any } {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}