import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../../app.constant';
@Injectable()
export class PurchaseService {
  public Url: string;
  constructor(public http: Http, public _config: Configuration) { }

  getAllPurchases(username, offset, limit, search, term): Observable<any> {
    let url = this._config.Server + "offers/" + username + "?offset=" + offset + "&limit=" + limit + "&search=" + search + "&term=" + term;
    return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
  }
  getUserDetail(user): Observable<any> {
    let url = this._config.Server + "userDetail?username=" + user;
    return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
  }
  getOfferDetails(username, postid, offset, limit) {
    let url = this._config.Server + "offers/" + username + "/" + postid + "?offset=" + offset + "&limit" + limit;
    return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
  }

}