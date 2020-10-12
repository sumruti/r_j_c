import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../app.constant';

@Injectable()
export class DeviceService {
    
    constructor(public http: Http, public _config: Configuration) { }

    getDevice(info): Observable<any> {
        // console.log("service username", info);
        let adminToken = localStorage.getItem('adminToken');
        // console.log(this._config.headers);
        let Url = this._config.Server + "getUserDevices";
        let body = { username: info, token: adminToken };
        //console.log("body",body);
        return this.http.post(Url, body, { headers: this._config.headers }).map(res => res.json());
    }
}