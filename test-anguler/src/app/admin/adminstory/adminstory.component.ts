import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit, ViewChild } from '@angular/core';
import { AppConfig } from "../../app.config";
import { Router } from '@angular/router';
import { AdminStoryService } from './adminstory.service';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { PagesComponent } from '../../pages/pages.component';

declare var swal: any;
declare var sweetAlert: any;
@Component({
    selector: 'adminstory',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./adminstory.component.scss'],
    templateUrl: './adminstory.component.html',
    providers: [AdminStoryService]
})

export class AdminStoryComponent {
    ckeditorContent: any;
    pageForm: FormGroup;
    fileName: any;
    type = 5;
    data1: any;
    dataURI: any;
    public_id: any;
    cropperSettings: CropperSettings;
    croppedWidth: number;
    croppedHeight: number;
    cloudinaryImage: any;
    private answer: any = '';
    imgagefile: any;
    private images: any = [];
    private uploaded: boolean = false;
    public config = {
        uiColor: '#F0F3F4',
        height: '600',
    };

    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
    imageSrc: any;
    constructor(private _appConfig: AppConfig, private _adminstoryservice: AdminStoryService, private router: Router, vcRef: ViewContainerRef, fb: FormBuilder,public _isAdmin: PagesComponent) {
        this.pageForm = fb.group({
            'fileName': "",
        });
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;
        this.data1 = {};
        // this.ckeditorContent = `<p></p>`;

    }
    ngOnInit() {
        if (this._isAdmin.isAdmin == false) {
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for (var x in roleDt) {
                if (x == 'config') {
                    if (roleDt[x] == 0) {
                        this.router.navigate(['error']);
                    } else if(roleDt[x] == 100 || roleDt[x] == 110){
                        jQuery(".configbtn").hide();
                    } 
                }
            }
        }

        this._adminstoryservice.getFileContent().subscribe(
            result => {
                this.ckeditorContent = result.data[0].configData;
                // console.log("result", this.ckeditorContent);
            }
        )
        this._adminstoryservice.getImages().subscribe(
            result => {
                this.imageSrc = result.data;
                // console.log("result", this.imageSrc);
            }
        )
    }


    cropped(bounds: Bounds) {
        this.croppedHeight = bounds.bottom - bounds.top;
        this.croppedWidth = bounds.right - bounds.left;
        // console.log("height", this.croppedHeight);
        // console.log("width", this.croppedWidth);
    }
    addImage(img) {
        // console.log("answer",this.ckeditorContent);
        this.ckeditorContent = this.ckeditorContent + "<img src=" + img + ">"
        // console.log("image",this.ckeditorContent)
    }
    fileChangeListener($event) {
        var image: any = new Image();
        var file: File = $event.target.files[0];
        var myReader: FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent: any) {

            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };
        myReader.readAsDataURL(file);
    }
    confirmUpload() {
        let dataURI = this.data1.image;
        // let imgres = dataURI.split(',')[1];
        // console.log("immmm",imgres);
        // console.log("img", dataURI);
        var blob = new Blob([dataURI], { type: 'image/png' });
        var fileName = (Math.random().toString(36).substring(7) + ".png");
        this.imgagefile = new File([blob], fileName)
        // console.log("imgurl", this.imgagefile);

        this._adminstoryservice.gotoimageUpload(dataURI).subscribe(
            result => {
                // console.log("result", result);
                this.ngOnInit();
            }
        )
    }
    gotoSaveFile() {
        // console.log("source", this.ckeditorContent);
        this.fileName = "Terms_And_Condition";
        this._adminstoryservice.gotoSubmitFile(this.ckeditorContent, this.type).subscribe(
            result => {
                // console.log("result", result);
                this.ngOnInit();
                if (result.code == 200) {
                    swal("Good job!", "File Saved Successfully!", "success");
                } else {
                    sweetAlert("Oops...", "Something went wrong!", "error");
                }
            }
        )
    }

}