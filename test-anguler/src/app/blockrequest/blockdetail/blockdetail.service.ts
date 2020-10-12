import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../app.constant';
@Injectable()
export class BlockDetailService {
  public Url: string;
  
  constructor(public http: Http, public _config: Configuration) { }

  getblockdetail(user):Observable<any>{
    let url = this._config.Server + "block/all?membername=" + user;
    return this.http.get(url,{headers :this._config.headers}).map(res => res.json());
  }
  getUserDetail(user): Observable<any> {
    let url = this._config.Server + "userDetail?username=" + user;
    return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
  }


}