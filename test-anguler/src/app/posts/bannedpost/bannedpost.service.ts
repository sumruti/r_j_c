import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../app.constant';

@Injectable()
export class BannedPostService {
    public Url: string;

    constructor(public http: Http, public _config: Configuration) { }
    getbannedpost(): Observable<any> {
        let url = this._config.Server + "bannedPost";
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    getUserDetail(user): Observable<any> {
        let url = this._config.Server + "userDetail?username=" + user;
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    gotoUnbanPost(postId): Observable<any> {
        let url = this._config.Server + "unbanPost";
        let body = { postId: postId, postType: 0 };
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }
}