import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { AppConfig } from "../../app.config";
import { AdminNewsService } from './adminnews.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
declare var swal: any;
declare var sweetAlert: any;
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { PagesComponent } from '../../pages/pages.component';
declare var CLOUDNAME: string, CLOUDPRESET: string;

@Component({
    selector: 'adminnews',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./adminnews.component.scss'],
    templateUrl: './adminnews.component.html',
    providers: [AdminNewsService]
})

export class AdminNewsComponent {
    public rowsOnPage = 10;
    newsForm: FormGroup;
    editNewsForm: FormGroup;
    public p = 1;
    newsData: any;
    public obj = '';
    cropperSettings: CropperSettings;
    croppedWidth: number;
    croppedHeight: number;
    cloudinaryImage: any;
    imgagefile: any;
    public url: any;
    state = 1;
    data: any;
    newsId: any;
    eNewsData: any;
    errorImg = false;
    logoUrl: any;
    public msg: any = false;
    btnFlag = true;
    

    uploader: CloudinaryUploader = new CloudinaryUploader(
        new CloudinaryOptions({ cloudName: CLOUDNAME, uploadPreset: CLOUDPRESET })
    );

    imageUploader = (item: any, response: string, status: number, headers: any) => {
        let cloudinaryImage = JSON.parse(response);
        this.url = cloudinaryImage.secure_url;
        return { item, response, status, headers };
    };
    constructor(private route: ActivatedRoute, private _adminnewsservice: AdminNewsService, private router: Router, vcRef: ViewContainerRef, fb: FormBuilder, public _isAdmin: PagesComponent) {
        this.newsForm = fb.group({
            'newsDetails': ['', Validators.required],
            'provider': ['', Validators.required],
            'newsLink': ['', Validators.required],
            'icon': "",
        });
        this.editNewsForm = fb.group({
            'newsDetails': ['', Validators.required],
            'provider': ['', Validators.required],
            'newsLink': ['', Validators.required],
            'icon': "",
        });
    }
    ngOnInit() {
        if (this._isAdmin.isAdmin == false) {
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for (var x in roleDt) {
                if (x == 'config') {
                    if (roleDt[x] == 0) {
                        this.router.navigate(['error']);
                    } else if (roleDt[x] == 100) {
                        jQuery(".buttonCus").hide();
                        this.btnFlag = false;  jQuery(".thAction").remove();
                        jQuery(".thTitle").css("width","47%");                                              
                    } else if (roleDt[x] == 110) {
                        this.btnFlag = false;  jQuery(".thAction").remove();
                        jQuery(".thTitle").css("width","47%");                                              
                    }
                }
            }
        }

        this.uploader.onSuccessItem = this.imageUploader;


        this._adminnewsservice.getNews().subscribe(
            result => {
                this.newsData = result.data;
            }
        )
    }
    upload() {
        this.uploader.uploadAll();
    }
    submitForm(value) {
        if (this.url != null) {
            this.msg = false;
            value._value.logoUrl = this.url;
            this._adminnewsservice.subminNews(value._value).subscribe(
                result => {
                    if (result.code == 200) {
                        swal("Success!", "News Added Successfully!", "success");
                    } else {
                        sweetAlert("Oops...", "Something went wrong!", "error");
                    }

                    jQuery('#addNews').modal('hide');
                    this.ngOnInit();
                    this.url = '';
                    this.newsForm.reset();
                }
            )
        } else {
            this.msg = true;
        }
    }
    submitData(url) {
        this.data.logoUrl = url;
        // this._adminnewsservice.subminNews(this.data).subscribe(
        //     result => {
        //         // console.log("result", result);
        //         if (result.code == 200) {
        //             swal("Good job!", "News Added Successfully!", "success");
        //         } else {
        //             sweetAlert("Oops...", "Something went wrong!", "error");
        //         }

        //         jQuery('#addNews').modal('hide');
        //         this.ngOnInit();
        //         this.newsForm.reset();
        //     }
        // )
    }
    editNews(data) {
        // console.log("data", data);
        this.url = data.logoUrl;
        this.obj = data;
        this.newsId = data._id;
        this.logoUrl = data.logoUrl;

    }
    editData(value) {
        value._value.logoUrl = this.url;
        value._value.newsId = this.newsId;
        this._adminnewsservice.editNewsData(value._value).subscribe(
            result => {
                if (result.code == 200) {
                    swal("Success!", "News Edited Successfully!", "success");
                } else if (result.code == 409) {
                    sweetAlert("Oops...", "Something went wrong!", "error");
                }

                jQuery('#editNews').modal('hide');
                this.ngOnInit();
                this.editNewsForm.reset();
            }
        )

    }
    // editNewsData(url) {
    //     this.eNewsData.logoUrl = url;
    //     this.eNewsData.newsId = this.newsId;
    //     this._adminnewsservice.editNewsData(this.eNewsData).subscribe(
    //         result => {
    //             // console.log("result", result);
    //             if (result.code == 200) {
    //                 swal("Good job!", "News Edited Successfully!", "success");
    //             } else if (result.code == 409) {
    //                 sweetAlert("Oops...", "Something went wrong!", "error");
    //             }

    //             jQuery('#editNews').modal('hide');
    //             this.ngOnInit();
    //             this.editNewsForm.reset();
    //         }
    //     )
    // }
    gotoDeleteNews(id) {
        var news = this;
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this News!",
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
                    news.deleteNews(id);
                    swal({
                        title: 'Delete!',
                        text: 'News Deleted Successfully!',
                        type: 'success'
                    });

                } else {
                    swal("Cancelled", "Your News is safe :)", "error");
                }
            });
    }
    deleteNews(id) {
        this._adminnewsservice.getodeleteNews(id).subscribe(
            result => {
                // console.log("result", result);
                this.ngOnInit();
            }
        )
    }
}