import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../app.constant';

@Injectable()
export class GuestUserService {
    public Url: string;
    public headers = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({
        headers: this.headers
    });

    constructor(public http: Http, public _config: Configuration) { }

    getGuestUser(offset, limit, sortCondition): Observable<any> {
        // console.log("offset",offset);
        // console.log("limit",limit);
        // let adminToken = localStorage.getItem('adminToken');
        let url = this._config.Server + "logGuest?limit=" + limit + "&offset=" + offset + "&sort=" + sortCondition;
        return this.http.get(url, {headers : this._config.headers}).map(res => res.json()).map(res => {
            // console.log(res);
            return res
        });
    }
}