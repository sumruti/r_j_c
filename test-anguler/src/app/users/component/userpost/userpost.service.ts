import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../../app.constant';

@Injectable()
export class UserPostService {
    public Url: string;

    constructor(public http: Http, public _config: Configuration) { }
    getPost(username, filter, category): Observable<any> {
        // console.log("headers", this._config.headers);
        let url = this._config.Server + "user/" + username + "/posts?category=" + category + "&filter=" + filter;
        // console.log(url);
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    deletepost(postsId, postType): Observable<any> {
        let url = this._config.Server + "admin-delete-post";
        let body = { postId: postsId, type: postType };
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    getPostImage(postId): Observable<any> {
        let url = this._config.Server + "";
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    getuserCategory(): Observable<any> {
        let url = this._config.Server + "getCategory";
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    getuserSubCategory(Category): Observable<any> {
        let url = this._config.Server + "getsubCategory?category=" + Category;
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