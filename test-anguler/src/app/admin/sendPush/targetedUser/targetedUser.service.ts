import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../../app.constant';

@Injectable()
export class pushTargetedUserService {
    public Url: string;

    constructor(public http: Http, public _config: Configuration) { }
    getUsers(id) {
        let url = this._config.Server + 'pushUser/' + id;
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
}