import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';

@Injectable()
export class Configuration {
    Server: string = 'http://3.23.53.159:3000/api/';
    ApiUrl: string = 'api/';
    ServerWithApiUrl = this.Server + this.ApiUrl;
    authToken = localStorage.getItem('adminToken');
    roleData: any;
    isAdmin: any;
    headers = new Headers({ 'Content-Type': 'application/json' });
    // options = new RequestOptions({
    //     headers: this.headers
    // });
    authPassword = '&jno-@8az=wSo*NHYVGpF^AQ?4yn36ZvW5ToUCUN+XGOuC?sz#SE$oxXVbwQGP|3WFyjcTAj2SIRQnLE|vo^-|-ATV5FZUf2*5A3Oiu|_EOMmG==&iApzQL3R7HHQj?jtb0mc2mT$Y%Isrgrxveld#Z^g3-ul^|0xAITganIuF23J0waSa6z6aP_+%De5LqtuY&ptx?qhZySECdyE^*4R^b*hFjQ-9?cCSJNfROzztEYbRyN=SqDyhhpzSmmP|Eb';

    auth = 'Basic ' + new Buffer("basicAuth:" + this.authPassword).toString('base64');
    jwtHelper: JwtHelper = new JwtHelper();

    token = localStorage.getItem('authToken') || '';
    constructor() {
        this.headers.append('token', localStorage.getItem('adminToken'));
        this.headers.append('authorization', this.auth);

        var token = localStorage.getItem('adminToken');
        if (token != null) {
            var adminType = this.jwtHelper.decodeToken(token);

            if (adminType.accessLevel == 1) {
                this.isAdmin = true;
            } else {
                this.isAdmin = false;
            }
        }
        var role = sessionStorage.getItem('role');
        this.roleData = JSON.parse(role);
    }
    setToken() {
        this.headers.set('token', localStorage.getItem('adminToken'));
    }

}