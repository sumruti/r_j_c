import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../../../app.config";
import { Router } from '@angular/router';
import { addRoleService } from './addRoles.service';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
// import { AuthHttp, AuthConfig, JwtHelper } from 'ng2-jwt';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
declare var swal: any;
import { Configuration } from '../../../app.constant';

@Component({
    selector: 'addRoles',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./addRoles.component.scss'],
    templateUrl: './addRoles.component.html',
    providers: [addRoleService]
})

export class addRolesComponent {
    public rowsOnPage = 10;
    public p = 1;
    msg: any = false;
    roles: FormGroup;
    addRoles: FormGroup;
    check: any;
    dashboard = false;
    registeredUsers = false;
    dashboardList: any = [];
    data: any = [];
    pageData: any = [];
    userDt = [];
    obj = '';
    roleArr = [];
    userId = [];
    access = [
        // ['Dashboard', 'dashboard'],
        ['User', 'registered-users'],
        ['Categories', 'categories'],
        ['Post', 'active-post'],
        ['Plans', 'plans'],
        ['Website Pages', 'config'],
        ['Report Reason', 'report-reason'],
        // ['Hash Tag', 'hash-tag'],
        ['Campaign', 'campaign'],
        // ['Update Keys', 'update-keys'],
        ['Push Notification', 'push-notification'],
        ['SEO', 'home'],
        // ['Wallets', 'customer-wallets'],
        ['App Version', 'app-version'],
    ];
    accData = {
        // 'dashboard': 0,
        'registered-users': 0,
        'categories': 0,
        'active-post': 0,
        'plans': 0,
        'config': 0,
        'report-reason': 0,
        // 'hash-tag': 0,
        'campaign': 0,
        // 'update-keys': 0,
        'push-notification': 0,
        'home': 0,
        // 'customer-wallets': 0,
        'app-version': 0,
    };

    constructor(private _appConfig: AppConfig, private _service: addRoleService, private router: Router, vcRef: ViewContainerRef, fb: FormBuilder, public _config: Configuration) {
        this.addRoles = fb.group({
            'roleName': ['', Validators.required],
        });
        this.roles = fb.group({
            'roleName': ['', Validators.required],
        });
    }
    jwtHelper: JwtHelper = new JwtHelper();
    ngOnInit() {
        var token = localStorage.getItem('adminToken');
        var adminType = this.jwtHelper.decodeToken(token);
        if (adminType.accessLevel == 2) {
            this.router.navigate(['error']);
        }
        this._service.getRoles().subscribe(
            res => {
                // console.log("res", res);
                if (res.data && res.data.length > 0) {
                    this.data = res.data;
                    this.msg = false;
                } else {
                    this.data = [];
                    this.msg = true;
                }
            }
        )
    }
    submitForm(val) {
        val._value.access = this.accData;
        this._service.editRole(val._value).subscribe(
            res => {
                jQuery('#editRoles').modal('hide');
                swal("Success!", "Updated Successfully!", "success");
            }
        )
    }
    addRoleEvent(event, title, type) {
        if (event.target.checked) {
            if (type == 'view') {
                this.accData[title] = 100;
            } else if (type == 'add') {
                this.accData[title] = 110;
                jQuery(".check1" + title).attr("disabled", true);
                jQuery(".check1" + title).prop('checked', true);

            } else if (type == 'edit') {
                jQuery(".check1" + title).prop('checked', true);
                jQuery(".check2" + title).prop('checked', true);
                jQuery(".check1" + title).attr("disabled", true);
                jQuery(".check2" + title).attr("disabled", true);

                this.accData[title] = 111;
            }
        } else {
            if (type == 'view') {
                this.accData[title] = 0;
                jQuery(".check2" + title).prop('checked', false);
                jQuery(".check3" + title).prop('checked', false);
                jQuery(".check2" + title).attr("disabled", false);
                jQuery(".check3" + title).attr("disabled", false);

            } else if (type == 'add') {
                this.accData[title] = 0;
                jQuery(".check1" + title).prop('checked', false);
                jQuery(".check3" + title).prop('checked', false);
                jQuery(".check1" + title).attr("disabled", false);
                jQuery(".check3" + title).attr("disabled", false);

            } else if (type == 'edit') {
                this.accData[title] = 0;
                jQuery(".check1" + title).prop('checked', false);
                jQuery(".check2" + title).prop('checked', false);
                jQuery(".check1" + title).attr("disabled", false);
                jQuery(".check2" + title).attr("disabled", false);

            }
        }
    }

    addRolesForm(val) {
        val._value.access = this.accData;
        this._service.editRole(val._value).subscribe(
            res => {
                if (res.code == 422) {
                    swal("Oops", res.message, "error")
                } else {
                    this.ngOnInit();
                    this.addRoles.reset();
                    this.access.forEach(e => {
                        jQuery(".check1" + e[1]).prop('checked', false);
                        jQuery(".check2" + e[1]).prop('checked', false);
                        jQuery(".check3" + e[1]).prop('checked', false);
                    });
                    jQuery('#addRoles').modal('hide');
                    swal("Success!", "Updated Successfully!", "success");
                }
            }
        )
    }

    gotoEditData(val) {
        this.obj = val;
        this.roleArr = val.access;
        for (var x in val.access) {
            for (var y in this.accData) {
                if (x == y) {
                    this.accData[y] = val.access[x];
                    if (this.accData[y] == 100) {
                        jQuery(".editCheck1" + y).prop('checked', true);
                    } else if (this.accData[y] == 110) {
                        jQuery(".editCheck1" + y).prop('checked', true);
                        jQuery(".editCheck2" + y).prop('checked', true);
                        jQuery(".editCheck1" + y).attr("disabled", true);
                    } else if (this.accData[y] == 111) {
                        jQuery(".editCheck1" + y).prop('checked', true);
                        jQuery(".editCheck2" + y).prop('checked', true);
                        jQuery(".editCheck3" + y).prop('checked', true);
                        jQuery(".editCheck1" + y).attr("disabled", true);
                        jQuery(".editCheck2" + y).attr("disabled", true);
                    }
                }
            }
        }
    }

    editRoleEvent(event, title, type) {
        if (event.target.checked) {
            if (type == 'view') {
                this.accData[title] = 100;
            } else if (type == 'add') {
                this.accData[title] = 110;
                jQuery(".editCheck1" + title).attr("disabled", true);
                jQuery(".editCheck1" + title).prop('checked', true);

            } else if (type == 'edit') {
                jQuery(".editCheck1" + title).prop('checked', true);
                jQuery(".editCheck2" + title).prop('checked', true);
                jQuery(".editCheck1" + title).attr("disabled", true);
                jQuery(".editCheck2" + title).attr("disabled", true);

                this.accData[title] = 111;
            }
        } else {
            if (type == 'view') {
                this.accData[title] = 0;
                jQuery(".editCheck2" + title).prop('checked', false);
                jQuery(".editCheck3" + title).prop('checked', false);
                jQuery(".editCheck2" + title).attr("disabled", false);
                jQuery(".editCheck3" + title).attr("disabled", false);

            } else if (type == 'add') {
                this.accData[title] = 0;
                jQuery(".editCheck1" + title).prop('checked', false);
                jQuery(".editCheck3" + title).prop('checked', false);
                jQuery(".editCheck1" + title).attr("disabled", false);
                jQuery(".editCheck3" + title).attr("disabled", false);

            } else if (type == 'edit') {
                this.accData[title] = 0;
                jQuery(".editCheck1" + title).prop('checked', false);
                jQuery(".editCheck2" + title).prop('checked', false);
                jQuery(".editCheck1" + title).attr("disabled", false);
                jQuery(".editCheck2" + title).attr("disabled", false);

            }
        }
    }
    gotoDeleteRoles(id) {
        var role = this;
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this Role!",
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
                    role.deleteRoles(id);
                } else {
                    swal("Cancelled", "Opretion could not be completed ", "error");
                }
            });
    }
    deleteRoles(id) {
        this._service.deleteRole(id).subscribe(
            res => {
                if (res.code == 200) {
                    this.ngOnInit();
                    swal({ title: 'Delete!', text: 'Role Deleted Successfully!', type: 'success' });
                } else if (res.code == 201) {
                    swal("Oops", "User is Associated to this role!", "error")
                }
            }
        )
    }
    getNoOfUser(id) {
        this._service.getUserAssociated(id).subscribe(
            res => {
                if (res.code == 200) {
                    jQuery('#noOfUser').modal('show');
                    this.userDt = res.data;
                }
            }
        )
    }
    userCheckEvent(e, id) {
        if (e.target.checked) {
            this.userId.push(id);
        } else if (!e.target.checked) {
            let indexx = this.userId.indexOf(id);
            this.userId.splice(indexx, 1);
        }
    }
    saveLinkedUser() {
        if (this.userId.length == 0) {
            swal("Please select user");
        } else {
            this._service.saveUserLink(this.userId).subscribe(
                res => {
                    if (res.code == 200) {
                        jQuery('#noOfUser').modal('hide');
                        swal("Success!", "Users Unlinked Successfully!", "success");
                    }
                }
            )
        }
    }
}