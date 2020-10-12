//============== importing all the required packages =================
import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../../../app.config";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LoginComponentService } from '../loginComponent.service';
import { AppComponent } from '../../../app.component';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
//import { AuthenticationService } from '../../../_services/authentication.service';



//============ exporting toaster service ==============
// import { ToasterService } from '../../../toaster.service';

//============ defining LogInComponent (custom login page) ================
@Component({
    selector: 'logIn',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./loginComponent.component.scss'],
    templateUrl: './loginComponent.component.html',
    providers: [LoginComponentService]
})

//================= exporting the login component ===================================
export class LogInComponent {
    public router: Router;
    public form: FormGroup;
    public forgotPassword: FormGroup;
    public username: AbstractControl;
    public password: AbstractControl;
    public email: AbstractControl;
    public log: any;
    public login: any;
    public sendEmail: any;
    public errflag: any;
    errMsg: any = false;
    public message: any;
    public Signup: any;
    returnUrl: string;


    constructor(router: Router, private route: ActivatedRoute, fb: FormBuilder, private _loginservice: LoginComponentService, vcRef: ViewContainerRef, private _appConfig: AppConfig) {
        this.router = router;
        this.form = fb.group({
            'username': ['', Validators.required],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
        // this.forgotPassword=fb.group({
        //     'oEmail': ['', Validators.compose([Validators.required, emailValidator])]
        // });
        // this.login={
        //     "oEmail":"",
        //     "oPassword":""
        // }
        // this.sendEmail={
        //     "oEmail":""
        // }
        this.Signup = fb.group({
            "Email": ['', Validators.required],
            "Password": ['', Validators.required],
            "conpass": ['', Validators.required]
        });

        this.username = this.form.controls['username'];
        this.password = this.form.controls['password'];
    }

    ngOnInit() {
        this._loginservice.logout();
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        // console.log("fwfwvv",this.returnUrl);
    }

    //================ function to allow to navigate to dashboard page when form inputs are valid ==============
    onSubmit(value) {
        this.log = value._value;
        // console.log("eded",value._value);
        this._loginservice.getlogin(value._value).subscribe(
            result => {
                this.message = result;
                // console.log("res", result);
                // this.errflag = result.errflag;
                // console.log("dcdwcdc",this.message);
                // this.errMsg = result.msg;
                // console.log("errflag",this.errflag);
                // console.log("login",this.message);

                if (result.code == 401 || result.code == 204) {
                    this.errMsg = "Invalid Username or Password";
                } else if (result.code == 200) {
                    if (result.subAdmin == 1) {
                        sessionStorage.setItem('role', JSON.stringify(result.data[0].access));
                    }
                    sessionStorage.setItem('username', result.data[0].username);
                    this.router.navigate(['app/dashboard']);
                }
            }
        )
    }
    Register(info: any) {
        jQuery('#Signup-modal').modal('hide');
        // console.log("info",info._value);
        this._loginservice.Adminregister(info._value).subscribe(
            result => {
                this.message = result;
                // console.log("result",this.message);
            }
        )
    }

    // resetPass(value):void{
    //     this.log = value._value;
    //     //console.log("eded",this.log);
    //     this._loginservice.resetpass(value._value).subscribe(
    //         result => {
    //             this.message = result;
    //             this.errflag = result.errFlag;
    //             if(this.errflag == 0)
    //             {
    //                 this.errMsg = result.errmsg;
    //             }
    //             else {
    //             this.router.navigate(['app/users']);
    //             }
    //         }
    //     )
    // }

}

//================== function to check email validation =======================
export function emailValidator(control: FormControl): { [key: string]: any } {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}