import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Configuration } from '../../app.constant';
// var headers = new Headers();
@Injectable()
export class LoginComponentService {
    public Url: any;
    // public headers = new Headers({ 'Content-Type': 'application/json' });
    // public options = new RequestOptions({
    //     headers: this.headers
    // });
    constructor(public http: Http, public _config: Configuration) {
        // super();
        // this.headers.append('Myheader', localStorage.getItem('adminToken'));
    }
    getlogin(data): Observable<any> {
        //console.log("login service",data);
        let Url = this._config.Server + "adminLogin";
        let body = JSON.stringify(data);
        return this.http.post(Url, body, { headers: this._config.headers }).map(res => res.json())
            .map(res => {
                let user = res;
                let adminToken = res.token;
                // let usr = user.Data.Email;
                //this.headers.append('token',user);
                // console.log("sadsadas", user);

                if (res.code == 200) {
                    localStorage.setItem('adminToken', adminToken);
                    this._config.setToken();
                }
                return res;
            });//res => res.json()
    }
    Adminregister(data): Observable<any> {
        // console.log("register service", data);
        let Url = this._config.Server + "register";
        let body = JSON.stringify(data);
        return this.http.post(Url, body, { headers: this._config.headers }).map(res => res.json());
    }
    // resetpass(data):Observable<any>{
    //     let Url = this._config.Server +"login";
    //     let body = JSON.stringify(data);
    //     return this.http.post(Url,body,{headers:this.headers}).map(res => res.json());
    // }

    logout() {
        localStorage.removeItem('adminToken');
        sessionStorage.removeItem('role');
    }



}