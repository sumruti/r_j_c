import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Navbarservice } from './navbar.service';
import { AppState } from '../../../app.state';



declare var swal: any;
declare var sweetAlert: any;
@Component({
    selector: 'navbar',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./navbar.scss'],
    templateUrl: './navbar.html',
    providers: [Navbarservice]
})


export class Navbar {
    public isMenuCollapsed: boolean = false;
    public errmsg: any;
    public rePass: any;
    userName: any;



    constructor(private _state: AppState, private route: ActivatedRoute, fb: FormBuilder, private _navbarservice: Navbarservice, private router: Router) {
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
        this.rePass = fb.group({
            // "Email":['', Validators.required],
            "oldPassword": ['', Validators.required],
            "newPassword": ['', Validators.required],
            "confirmPassword": ['', Validators.required]
        });
        this.userName = sessionStorage.getItem('username');
    }


    resetPass(info: any): void {
        this._navbarservice.repass(info._value).subscribe(
            result => {
                this.errmsg = result.code;
                if (this.errmsg == 9158) {
                    sweetAlert("Oops...", "Incorrect old Password!", "error");
                } else if (this.errmsg == 9159) {
                    sweetAlert("Oops...", "New password and confirm password does not match!", "error");
                } else if (this.errmsg == 200) {
                    swal('Success!', 'Password had been Updated,please login!', 'success');
                    jQuery('#reset-modal').modal('hide');
                    this.rePass.reset();
                    localStorage.removeItem('adminToken');
                    this.router.navigate(['/login']);
                }
            }
        )
    }



    public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    }

}