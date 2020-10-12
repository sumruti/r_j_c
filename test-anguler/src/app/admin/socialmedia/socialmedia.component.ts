import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from "../../app.config";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { SocialMediaService } from './socialmedia.service';
declare var swal: any;
declare var sweetAlert: any;
@Component({
    selector: 'socialmedia',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./socialmedia.component.scss'],
    templateUrl: './socialmedia.component.html',
    providers: [SocialMediaService]
})

export class SocialMediaComponent {
    socialForm: FormGroup;
    editsocialForm: FormGroup;
    socialData: any = [];
    errMsg: any = false;
    public rowsOnPage = 10;
    obj: any = '';
    socialId: any;
    constructor(private _appConfig: AppConfig, private _service: SocialMediaService, private router: Router, fb: FormBuilder) {
        this.socialForm = fb.group({
            'socialLink': ['', Validators.required],
        });
        this.editsocialForm = fb.group({
            'socialLink': ['', Validators.required],
        });
    }
    ngOnInit() {
        this._service.getAllLink().subscribe(
            result => {
                // console.log("result", result);

                if (result.data && result.data.length > 0) {
                    this.errMsg = false;
                    this.socialData = result.data;
                } else {
                    this.socialData = [];
                    this.errMsg = 'No Data Found';
                }
            }
        )
    }
    submitForm(data) {
        // console.log("submitForm", data._value);
        this._service.saveSocialMedia(data._value).subscribe(
            result => {
                // console.log("result", result);
                if (result.code == 200) {
                    swal("Good job!", "Job Added Successfully!", "success");
                } else {
                    sweetAlert("Oops...", "Something went wrong!", "error");
                }
                jQuery('#addLinks').modal('hide');
                this.ngOnInit();
                this.socialForm.reset();
            }
        )
    }
    gotoEditData(data) {
        this.obj = data;
        this.socialId = data._id;
        // console.log("data", data);
    }
    editForm(value) {

        value._value.socialId = this.socialId;
        // console.log("id", value._value);
        this._service.editFormData(value._value).subscribe(
            result => {
                // console.log("result", result);
                if (result.code == 200) {
                    swal("Good job!", "Job Edited Successfully!", "success");
                } else {
                    sweetAlert("Oops...", "Something went wrong!", "error");
                }
                jQuery('#editLink').modal('hide');
                this.ngOnInit();
                this.editsocialForm.reset();
            }
        )
    }
    gotoDeleteData(id) {
        var pro = this;
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this Job!",
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
                    pro.deleteLink(id);
                    swal({
                        title: 'Delete!',
                        text: 'Job Deleted Successfully!',
                        type: 'success'
                    });

                } else {
                    swal("Cancelled", "Your Job is safe :)", "error");
                }
            });
    }
    deleteLink(id) {
            this._service.deleteLinkData(id).subscribe(
                result => {
                    // console.log("result", result);
                    this.ngOnInit();
                }
            )
    }

}