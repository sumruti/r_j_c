import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../../app.constant';
@Injectable()
export class UserRatingService {
  public Url: string;
  constructor(public http: Http, public _config: Configuration) { }

  getUserRating(limit, offset) {
    let url = this._config.Server + "admin/rating?limit=" + limit + "&offset=" + offset;
    return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
  }
  getUserDetail(user): Observable<any> {
    let url = this._config.Server + "userDetail?username=" + user;
    return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
  }
  getUseravgRating(limit, offset, username) {
    let url = this._config.Server + "admin/avgRating?username=" + username;
    return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
  }

}