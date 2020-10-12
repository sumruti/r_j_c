import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../app.constant';
@Injectable()
export class RejectedUserService {
  public users: any;
  public Url: string;

  constructor(public http: Http, public _config: Configuration) { }


  rejecteduser(offset, limit, searchEnabled, searchTerm, ): Observable<any> {
    let url = this._config.Server + "reject?limit=" + limit + "&offset=" + offset + "&search=" + searchEnabled + "&term=" + searchTerm;
    return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
  }

  reactiveuser(userReactive): Observable<any> {
    let url = this._config.Server + "reactivate";
    let body = { membername: userReactive };
    return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
  }
  getUserDetail(user): Observable<any> {
    let url = this._config.Server + "userDetail?username=" + user;
    return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
  }

}