import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../../app.constant';

@Injectable()
export class newPushService {
    public Url: string;

    constructor(public http: Http, public _config: Configuration) { }
    getTargetUser(offset, limit, lat, long, location, radius, unit) {
        let url = this._config.Server + "campaign/users";
        let body = {
            limit: limit,
            offset: offset,
            location: location,
            latitude: lat,
            longitude: long,
            distanceUnit: unit,
            radius: radius
        };
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    sendPushLocation(data) {
        let url = this._config.Server + "sendPush/location";
        let body = JSON.stringify(data);
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }
}