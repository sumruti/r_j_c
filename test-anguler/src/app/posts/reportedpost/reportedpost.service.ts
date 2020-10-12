import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../app.constant';

@Injectable()
export class ReportedPostService {
    public Url: string;

    constructor(public http: Http, public _config: Configuration) { }

    getReportedPost(limit, offset): Observable<any> {
        let url = this._config.Server + "admin/reportedpostpost?limit=" + limit + "&offset=" + offset;
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    gotoBanPost(postId): Observable<any> {
        let url = this._config.Server + "banPost";
        let body = { postId: postId, postType: 0 };
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    gotoUnBanPost(postId): Observable<any> {
        let url = this._config.Server + "unbanPost";
        let body = { postId: postId, postType: 0 };
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    getUserDetail(user): Observable<any> {
        let url = this._config.Server + "userDetail?username=" + user;
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }


}