import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../app.constant';
@Injectable()
export class BlockRequestService {
  public Url: string;

  constructor(public http: Http, public _config: Configuration) { }

  getBlockRequest(offset, limit, searchTerm): Observable<any> {
    // let url = this._config.Server + "";
    let url = this._config.Server + "block/all?searchKey=" + searchTerm;
    return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
  }
  getUserDetail(user): Observable<any> {
    let url = this._config.Server + "userDetail?username=" + user;
    return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
  }
}