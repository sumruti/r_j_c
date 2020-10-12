import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../app.constant';
@Injectable()
export class CreatePostService {
    public Url: string;
    constructor(public http: Http, public _config: Configuration) { }

    getAdminPost(category, filter, search, term): Observable<any> {
        let url = this._config.Server + "adminPosts?category=" + category + "&filter=" + filter + "&search=" + search + "&term=" + term;
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }

    getusername(searchEnabled, term): Observable<any> {
        let url = this._config.Server + "getuser?search=" + searchEnabled + "&term=" + term;
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
    submitPost(data): Observable<any> {
        // console.log("service data",data);
        let url = this._config.Server + "adminpost";
        let body = JSON.stringify(data);
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    updatepost(data): Observable<any> {
        // console.log("service", data);
        let url = this._config.Server + "adminpost";
        let body = JSON.stringify(data);
        return this.http.put(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    getUserDetail(user): Observable<any> {
        let url = this._config.Server + "userDetail?username=" + user;
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    deletePost(id): Observable<any> {
        let url = this._config.Server + "admin-delete-post";
        let body = { postId: id, type: 0 };
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    // uploadphoto():Observable<any>{
    //     let url = this._config.Server + "getSignature";
    //     let body = {};
    //     return this.http.post(url,body,{headers :this._config.headers}).map(res => res.json());
    // }
}