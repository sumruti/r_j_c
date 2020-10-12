import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../app.constant';

@Injectable()
export class sendPushService {
    public Url: string;

    constructor(public http: Http, public _config: Configuration) { }
    getPushData() {
        let Url = this._config.Server + "sendPush/location";
        return this.http.get(Url, { headers: this._config.headers }).map(res => res.json());
    }
    deletePush(user) {
        let url = this._config.Server + "notification?userId=" + user;
        return this.http.delete(url, { headers: this._config.headers }).map(res => res.json());
    }
    resendNotification(id) {
        let url = this._config.Server + "resendNotification";
        return this.http.post(url, { pushId: id }, { headers: this._config.headers }).map(res => res.json());
    }
}