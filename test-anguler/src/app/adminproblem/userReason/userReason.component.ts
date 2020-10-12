import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from "../../app.config";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { UserReasonService } from './userReason.service';
import { PagesComponent } from '../../pages/pages.component';
declare var swal: any;
declare var sweetAlert: any;
@Component({
    selector: 'userReason',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./userReason.component.scss'],
    templateUrl: './userReason.component.html',
    providers: [UserReasonService]
})

export class UserReasonComponent {
    userProForm: FormGroup;
    edituserProForm: FormGroup;
    reasonData: any = [];
    errMsg: any = false;
    public rowsOnPage = 10;
    obj: any = '';
    reasonId: any;
    btnFlag = true;
    
    constructor(private _appConfig: AppConfig, private _service: UserReasonService, private router: Router, fb: FormBuilder,public _isAdmin: PagesComponent) {
        this.userProForm = fb.group({
            'userReason': ['', Validators.required],
        });
        this.edituserProForm = fb.group({
            'userReason': ['', Validators.required],
        });
    }
    ngOnInit() {
        if (this._isAdmin.isAdmin == false) {
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for (var x in roleDt) {
                if (x == 'report-reason') {
                    if (roleDt[x] == 0) {
                        this.router.navigate(['error']);
                    } else if(roleDt[x] == 100){
                        jQuery(".buttonCus").hide();jQuery(".thAction").remove();
                        jQuery(".thTitle").css("width","95%");
                        this.btnFlag = false;                                                                                                
                    } else if(roleDt[x] == 110){
                        this.btnFlag = false;  jQuery(".thAction").remove();
                        jQuery(".thTitle").css("width","95%");                                                                                              
                    }
                }
            }
        }

        this._service.getuserReason().subscribe(
            result => {
                // console.log("result", result);

                if (result.data && result.data.length > 0) {
                    this.errMsg = false;
                    this.reasonData = result.data;
                } else {
                    this.reasonData = [];
                    this.errMsg = 'No Data Found';
                }
            }
        )
    }
    submitForm(data) {
        // console.log("submitForm", data._value);
        this._service.saveReportReason(data._value).subscribe(
            result => {
                // console.log("result", result);
                if (result.code == 200) {
                    swal("Good job!", "Job Added Successfully!", "success");
                } else {
                    sweetAlert("Oops...", "Something went wrong!", "error");
                }
                jQuery('#addProblem').modal('hide');
                this.ngOnInit();
                this.userProForm.reset();
            }
        )
    }
    gotoEditData(data) {
        this.obj = data;
        this.reasonId = data._id;
        // console.log("data", data);
    }
    editForm(value) {

        value._value.reasonId = this.reasonId;
        // console.log("id", value._value);
        this._service.editFormData(value._value).subscribe(
            result => {
                // console.log("result", result);
                if (result.code == 200) {
                    swal("Good job!", "Job Edited Successfully!", "success");
                } else {
                    sweetAlert("Oops...", "Something went wrong!", "error");
                }
                jQuery('#editProblem').modal('hide');
                this.ngOnInit();
                this.edituserProForm.reset();
            }
        )
    }
    gotoDeleteData(id) {
        var pro = this;
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this Reason!",
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
                    pro.deleteFeature(id);
                    swal({
                        title: 'Delete!',
                        text: 'Reason Deleted Successfully!',
                        type: 'success'
                    });

                } else {
                    swal("Cancelled", "Your Reason is safe :)", "error");
                }
            });
    }
    deleteFeature(id) {
        this._service.deleteFeature(id).subscribe(
            result => {
                // console.log("result", result);
                this.ngOnInit();
            }
        )
    }

}