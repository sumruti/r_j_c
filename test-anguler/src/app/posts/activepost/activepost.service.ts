import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../app.constant';
@Injectable()
export class ActivePostService {
  public Url: string;
  constructor(public http: Http, public _config: Configuration) { }

  getactivepost(offset, limit, searchEnabled, searchTerm, sortCondition, filter, category): Observable<any> {
    let url = this._config.Server + "admin/posts";
    let body = {
      limit: limit, offset: offset, search: searchEnabled.toString(),
      term: searchTerm, sort: sortCondition,
      filter: filter, category: category
    };
    return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
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
  getuserCategory(): Observable<any> {
    let url = this._config.Server + "getCategory";
    return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
  }
  getuserSubCategory(Category): Observable<any> {
    let url = this._config.Server + "getsubCategory?category=" + Category;
    return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
  }
  banPost(postId) {
    let url = this._config.Server + "banPost";
    let body = { postId: postId, postType: 0 };
    return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());

  }

  seoSave(data) {
    let url = this._config.Server + "saveSeoPost";
    let body = JSON.stringify(data);
    return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
  }
  seoPostAltImg(id, key, txt) {
    let url = this._config.Server + "saveSeoPostAlt";
    let body = {
      postId: id,
      imgKey: key,
      altText: txt
    };
    return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
  }

}
