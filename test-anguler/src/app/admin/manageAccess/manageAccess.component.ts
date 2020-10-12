import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../../app.config";
import { Router } from '@angular/router';
import { manageAccessService } from './manageAccess.service';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
declare var swal: any;
import { PagesComponent } from '../../pages/pages.component';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';


@Component({
    selector: 'manageAccess',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./manageAccess.component.scss'],
    templateUrl: './manageAccess.component.html',
    providers: [manageAccessService]
})

export class ManageAccessComponent {
    public rowsOnPage = 10;
    public p = 1;
    msg: any = false;
    roles: FormGroup;
    editRoles: FormGroup;
    check: any;
    dashboard = false;
    registeredUsers = false;
    userData: any = [];
    pageData: any = [];
    data = [];
    obj = '';
    roleId: any;
    managerName: any;
    password: any;
    jwtHelper: JwtHelper = new JwtHelper();


    constructor(private _appConfig: AppConfig, private _service: manageAccessService, private router: Router, vcRef: ViewContainerRef, fb: FormBuilder, public _isAdmin: PagesComponent) {
        this.roles = fb.group({
            'managerName': ['', Validators.required],
            'roleId': ['', Validators.required],
            'email': ['', Validators.required],
            'password': ['', Validators.required],
        });
        this.editRoles = fb.group({
            'email': ['', Validators.required],
            'roleId': [''],
        })
    }

    ngOnInit() {
        var token = localStorage.getItem('adminToken');
        var adminType = this.jwtHelper.decodeToken(token);
        if (adminType.accessLevel == 2) {
            this.router.navigate(['error']);
        }

        this.msg = true;
        this._service.getRoles().subscribe(
            res => {
                if (res.data && res.data.length > 0) {
                    this.data = res.data;
                }
            }
        )

        this._service.getUser().subscribe(
            res => {
                if (res.data && res.data.length > 0) {
                    this.msg = false;
                    this.userData = res.data;
                } else {
                    this.msg = true;
                    this.userData = [];
                }
            }
        )
    }
    submitForm(val) {
        this._service.addUser(val._value).subscribe(
            res => {
                if (res.code == 200) {
                    this.ngOnInit();
                    this.roles.reset();
                    jQuery('#addAdmin').modal('hide');
                    swal("Success!", "User added Successfully!", "success");
                }
            }
        )
    }
    gotoEditData(dt) {
        this.roleId = dt.roleId;
        jQuery("#roleSelect").val(dt.roleId);
        this.obj = dt;
        this.managerName = dt.managerName;
        this.password = dt.password;
    }
    editRoleForm(val) {
        if (val._value.roleId == '') {
            val._value.roleId = this.roleId;
        }
        val._value.managerName = this.managerName;
        val._value.password = this.password;
        this._service.addUser(val._value).subscribe(
            res => {
                if (res.code == 200) {
                    this.ngOnInit();
                    this.roles.reset();
                    jQuery('#editAdmin').modal('hide');
                    swal("Success!", "User Edited Successfully!", "success");
                }
            }
        )
    }
    gotoDeleteRole(name) {
        var role = this;
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this User!",
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
                    role.deleteUser(name);
                } else {
                    swal("Cancelled", "Your User is safe :)", "error");
                }
            });
    }
    deleteUser(name) {
        this._service.deleteUser(name).subscribe(
            res => {
                if (res.code == 200) {
                    this.ngOnInit();
                    swal({
                        title: 'Delete!',
                        text: 'User Deleted Successfully!',
                        type: 'success'
                    });
                }
            }
        )

    }
    // gotoAddUserManage() {
    //     this._service.getPages().subscribe(
    //         res => {
    //             this.pageData = res.data;
    //             jQuery('#addAdmin').modal('show');

    //         }
    //     )
    // }
    // addUserEvent(event, title, type) {
    //     this.pageData.pages.forEach(e => {
    //         if (event.target.checked) {
    //             if (e.name == title) {
    //                 if (type == 'view') {
    //                     e.view = '1';
    //                 } else if (type == 'add') {
    //                     e.add = '1';
    //                 } else if (type == 'edit') {
    //                     e.edit = '1';
    //                 }
    //             }
    //         } else if (!event.target.checked) {
    //             if (e.name == title) {
    //                 if (type == 'view') {
    //                     e.view = '0';
    //                 } else if (type == 'add') {
    //                     e.add = '0';
    //                 } else if (type == 'edit') {
    //                     e.edit = '0';
    //                 }
    //             }
    //         }
    //     });
    // }

    gotoAddRole() {
        this.router.navigate(['/app/manage-access/add-roles']);
    }
}