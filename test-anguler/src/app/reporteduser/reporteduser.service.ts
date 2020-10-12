import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../app.constant';
@Injectable()
export class ReportedUserService {
  public users: any;
  public Url: string;

  constructor(public http: Http, public _config: Configuration) { }

  getReportedUser(limit, offset, searchFlag, searchText): Observable<any> {
    let url = this._config.Server + "admin/reported?" + "&limit=" + limit + "&offset=" + offset
      + "&search=" + searchFlag + "&term=" + searchText;
    return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
  }
  reporejectUser(userReject): Observable<any> {
    let url = this._config.Server + "reject";
    // console.log(userReject);
    let body = { reject: userReject };
    // console.log(body);
    return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
  }
  getUserDetail(user): Observable<any> {
    let url = this._config.Server + "userDetail?username=" + user;
    return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
  }


}