import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppConfig } from "../../app.config";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { SeoService } from '../seo.service';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { PagesComponent } from '../../pages/pages.component';

declare var swal: any;
declare var sweetAlert: any;
declare var CLOUDNAME: string, CLOUDPRESET: string;
@Component({
    selector: 'about',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./about.component.scss'],
    templateUrl: './about.component.html',
    providers: [SeoService]
})

export class AboutComponent {
    seoSetting: FormGroup;
    socialMedia: FormGroup;
    keyWord: any;
    data: any;
    title: any;
    description: any;

    uploadType = 0;
    tSocialMedia: FormGroup;
    fData = '';
    tData = '';
    cropperSettings: CropperSettings;
    croppedWidth: number;
    croppedHeight: number;
    cloudinaryImage: any;
    imgagefile: any;
    public url: any;
    tUrl: any;
    type = 11;


    uploader: CloudinaryUploader = new CloudinaryUploader(
        new CloudinaryOptions({ cloudName: CLOUDNAME, uploadPreset: CLOUDPRESET })
    );

    imageUploader = (item: any, response: string, status: number, headers: any) => {
        let cloudinaryImage = JSON.parse(response);
        // console.log("cloudinaryImage", cloudinaryImage);
        if (this.uploadType == 1) {
            this.tUrl = cloudinaryImage.secure_url;
            // console.log("this.turl",this.tUrl);
        } else {
            this.url = cloudinaryImage.secure_url;
            // console.log(" this.url", this.url);
        }
        return { item, response, status, headers };
    };
    constructor(private route: ActivatedRoute, private _service: SeoService, private router: Router, vcRef: ViewContainerRef, fb: FormBuilder, public _isAdmin: PagesComponent) {
        this.seoSetting = fb.group({
            'title': ['', Validators.required],
            'description': ['', Validators.required],
            // 'keyword': ['', Validators.required],
        });
        this.socialMedia = fb.group({
            'image': ['', Validators.required],
            'title': ['', Validators.required],
            'altTag': ['', Validators.required],
            'description': ['', Validators.required]
        });
        this.tSocialMedia = fb.group({
            'image': ['', Validators.required],
            'title': ['', Validators.required],
            'altTag': ['', Validators.required],
            'description': ['', Validators.required]
        });
    }

    ngOnInit() {
        if (this._isAdmin.isAdmin == false) {
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for (var x in roleDt) {
                if (x == 'home') {
                    if (roleDt[x] == 0) {
                        this.router.navigate(['error']);
                    } else if (roleDt[x] == 100 || roleDt[x] == 110) {
                        jQuery(".btn-default").hide();
                    }
                }
            }
        }
        this.uploader.onSuccessItem = this.imageUploader;

        this._service.getSEOSetting(this.type).subscribe(
            res => {
                // console.log("res", res);
                if (res.data) {
                    this.title = res.data.title;
                    this.description = res.data.description;
                    this.data = res.data.keyword;
                    if (res.data.facebook) {
                        this.fData = res.data.facebook;
                        this.url = res.data.facebook.image;
                    }
                    if (res.data.twitter) {
                        this.tData = res.data.twitter;
                        this.tUrl = res.data.twitter.image;
                    }
                    var ar = [];
                    this.data.forEach(e => {
                        ar.push(e);
                        jQuery(".abc").val(ar);
                        jQuery("#tags").append('<span>' + e + '</span>');
                    });
                }
            }
        )
        jQuery(function () { // DOM ready

            // ::: TAGS BOX
            var x = jQuery(".abc").val();
            var arr = x.split(',');
            jQuery("#tags input").on({
                focusout: function () {
                    var txt = this.value.replace(/[^a-z0-9\+\-\.\#]/ig, ''); // allowed characters
                    if (txt) {
                        arr.push(txt);
                        // this.keyWord = arr;
                        jQuery(".abc").val(arr)
                        if (txt) jQuery("<span/>", { text: txt.toLowerCase(), insertBefore: this });
                        this.value = "";
                    }
                },
                keyup: function (ev) {
                    // if: comma|enter (delimit more keyCodes with | pipe)
                    // if (/(188|13)/.test(ev.which)) jQuery(this).focusout();
                    if (/(188)/.test(ev.which)) jQuery(this).focusout();
                }
            });
            jQuery('#tags').on('click', 'span', function () {
                let indexx = arr.indexOf(jQuery(this).text());
                arr.splice(indexx, 1);
                // this.keyWord = arr;
                // console.log("arrr", arr);
                jQuery(".abc").val(arr)
                jQuery(this).remove();
            });

        });

    }
    upload(t) {
        this.uploader.uploadAll();
    }
    uploadTwitter(t) {
        this.uploader.uploadAll();
        this.uploadType = 1;
    }
    submitForm(value) {
        this.keyWord = jQuery(".abc").val().split(',').filter(v => v != '');
        if (this.keyWord.length == 0) {
            swal("Please enter tag");
        } else {
            // console.log("keyword", this.keyWord);
            value._value.keyword = this.keyWord;
            value._value.type = this.type;
            // console.log("this.keyWord", value._value);
            this._service.saveSetting(value._value).subscribe(
                res => {
                    // console.log("res", res);
                    if (res.code == 200) {
                        // this.ngOnInit();
                        swal("Success!", "Save successfully!", "success");
                    } else {
                        sweetAlert("Oops...", "Something went wrong!", "error");
                    }
                }
            )
        }
    }
    seoSettingDelete() {
        var news = this;
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this Setting!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    news.deleteSeo();
                    swal({
                        title: 'Delete!',
                        text: 'Deleted Successfully!',
                        type: 'success'
                    });

                } else {
                    swal("Cancelled", "Your Seo is safe :)", "error");
                }
            });
    }
    deleteSeo() {
        this._service.deleteSeo(this.type).subscribe(
            res => {
                this.ngOnInit();
                // console.log("res", res);
            }
        )
    }


    facebookData(val) {
        val._value.type = this.type;
        val._value.key = 'facebook';
        // console.log("val", val._value);
        this._service.saveSetting(val._value).subscribe(
            res => {
                console.log("res", res);
                if (res.code == 200) {
                    // this.ngOnInit();
                    swal("Success!", "Save successfully!", "success");
                } else {
                    sweetAlert("Oops...", "Something went wrong!", "error");
                }
            }
        )
    }
    socialMediaDelete() {
        var news = this;
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this Setting!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    news.deleteSocialMedia();
                    swal({
                        title: 'Delete!',
                        text: 'Deleted Successfully!',
                        type: 'success'
                    });

                } else {
                    swal("Cancelled", "Your Seo is safe :)", "error");
                }
            });
    }
    deleteSocialMedia() {
        var key = 'facebook';
        this._service.deleteSeo1(this.type, key).subscribe(
            res => {
                this.ngOnInit();
                console.log("res", res);
            }
        )
    }

    twitterData(val) {
        val._value.type = this.type;
        val._value.key = 'twitter';
        this._service.saveSetting(val._value).subscribe(
            res => {
                // console.log("res", res);
                if (res.code == 200) {
                    // this.ngOnInit();
                    swal("Success!", "Save successfully!", "success");
                } else {
                    sweetAlert("Oops...", "Something went wrong!", "error");
                }
            }
        )
    }
    tMediaDelete() {
        var news = this;
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this Setting!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    news.twitterDeleteSocialMedia();
                    swal({
                        title: 'Delete!',
                        text: 'Deleted Successfully!',
                        type: 'success'
                    });

                } else {
                    swal("Cancelled", "Your Seo is safe :)", "error");
                }
            });
    }
    twitterDeleteSocialMedia() {
        var key = 'twitter';
        this._service.deleteSeo1(this.type, key).subscribe(
            res => {
                this.ngOnInit();
                console.log("res", res);
            }
        )
    }
}