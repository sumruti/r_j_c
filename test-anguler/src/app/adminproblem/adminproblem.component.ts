import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from "../app.config";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { AdminProblemService } from './adminproblem.service';
declare var swal: any;
declare var sweetAlert: any;
@Component({
    selector: 'adminproblem',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./adminproblem.component.scss'],
    templateUrl: './adminproblem.component.html',
    providers: [AdminProblemService]
})

export class AdminProblemComponent {
    public p = 1;
    public rowsOnPage = 10;
    adminProForm: FormGroup;
    editProbForm: FormGroup;
    feature: any;
    featureData: any = [];
    errMsg: any = false;
    featureTitle = [];
    obj: any = '';
    featureId: any;
    // errMsg: any;
    constructor(private _appConfig: AppConfig, private _adminproblemservice: AdminProblemService, private router: Router, fb: FormBuilder) {
        this.adminProForm = fb.group({
            'feature': ['', Validators.required],
        });
        this.editProbForm = fb.group({
            'feature': ['', Validators.required],
        });
    }
    ngOnInit() {
        this._adminproblemservice.getAdminProblem().subscribe(
            result => {

                // console.log("result", result);
                if (result.data && result.data.length > 0) {
                    this.errMsg = false;
                    this.featureData = result.data;
                } else {
                    this.featureData = [];
                    this.errMsg = 'No Data Found';
                }
            }
        )
    }
    submitForm(data) {
        // console.log("submitForm", data._value);
        this._adminproblemservice.saveReportReason(data._value).subscribe(
            result => {
                // console.log("result", result);
                if (result.code == 200) {
                    swal("Good job!", "Feature Added Successfully!", "success");
                } else {
                    sweetAlert("Oops...", "Something went wrong!", "error");
                }
                jQuery('#addProblem').modal('hide');
                this.ngOnInit();
                this.adminProForm.reset();
            }
        )
    }
    gotoEditData(data) {
        this.obj = data;
        this.featureId = data._id;
        // console.log("data", data);
    }
    editForm(value) {
        
        value._value.featureId = this.featureId;
        // console.log("id", value._value);
        this._adminproblemservice.editFormData(value._value).subscribe(
            result => {
                // console.log("result", result);
                if (result.code == 200) {
                    swal("Good job!", "Feature Edited Successfully!", "success");
                } else {
                    sweetAlert("Oops...", "Something went wrong!", "error");
                }
                jQuery('#editProblem').modal('hide');
                this.ngOnInit();
                this.editProbForm.reset();
            }
        )
    }
    gotoDeleteData(id) {
        var pro = this;
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this Feature!",
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
                        text: 'Feature Deleted Successfully!',
                        type: 'success'
                    });

                } else {
                    swal("Cancelled", "Your Feature is safe :)", "error");
                }
            });
    }
    deleteFeature(id) {
        this._adminproblemservice.deleteFeature(id).subscribe(
            result => {
                // console.log("result", result);
                this.ngOnInit();
            }
        )
    }


    // addFeatureTitle() {

    //     this.featureTitle.push(this.feature);
    //     jQuery("#fTitle").val("");
    //     // console.log("fea", this.featureTitle);
    // }
    // gotoRemoveFeature(d) {
    //     let indexx = this.featureTitle.indexOf(d);
    //     this.featureTitle.splice(indexx, 1);
    //     // console.log("aa", this.featureTitle);
    // }
    // saveFeature() {
    //     this._adminproblemservice.gotoSaveFeature(this.featureTitle).subscribe(
    //         result => {
    //             console.log("result", result);
    //         }
    //     )
    // }
}