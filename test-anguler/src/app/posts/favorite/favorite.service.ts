import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../app.constant';
@Injectable()
export class FavoriteService {
  public Url: string;
  constructor(public http: Http, public _config: Configuration) { }

  getFavorite(postId, type, limit, offset): Observable<any> {
    let url = this._config.Server + "getAllLikes";
    let body = { postId: postId, postType: type, limit: limit, offset: offset };
    return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());

  }
  getUserDetail(user): Observable<any> {
    let url = this._config.Server + "userDetail?username=" + user;
    return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
  }

}