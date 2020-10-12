import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../app.constant';
@Injectable()
export class ReportedCountService {
  public users: any;
  public Url: string;

  constructor(public http: Http, public _config: Configuration) { }

  getReportedCount(userReported, offset, limit): Observable<any> {
    let url = this._config.Server + "admin/reported/details?username=" + userReported + "&limit=" + limit + "&offset=" + offset;
    return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
  }
  getUserDetail(user): Observable<any> {
    let url = this._config.Server + "userDetail?username=" + user;
    return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
  }

}