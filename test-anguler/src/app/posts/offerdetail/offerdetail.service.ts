import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../app.constant';
@Injectable()
export class OfferDetailService {
    public Url: string;
    constructor(public http: Http, public _config: Configuration) { }

    getOffer(id, search, term): Observable<any> {
        let url = this._config.Server + "offerDetails";
        let body = { postId: id, search: search, term: term };
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    getUserDetail(user): Observable<any> {
        let url = this._config.Server + "userDetail?username=" + user;
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    getOfferView(id, offset, limit) {
        let url = this._config.Server + "offerDetails/" + id + "?offset=" + offset + "&limit=" + limit;
        return this.http.post(url, {}, { headers: this._config.headers }).map(res => res.json());
    }
}