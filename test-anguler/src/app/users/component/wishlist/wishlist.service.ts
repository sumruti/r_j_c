import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../../app.constant';

@Injectable()
export class WishListService {

    constructor(public http: Http, public _config: Configuration) { }

    getUserWishlist(user): Observable<any> {
        let url = this._config.Server + "user/" + user + "/likes";
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    getPostDetails(postId, postby): Observable<any> {
        let url = this._config.Server + "posts/" + postId + "?username=" + postby;
        // console.log(url);
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    getUserDetail(user): Observable<any> {
        let url = this._config.Server + "userDetail?username=" + user;
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }

}