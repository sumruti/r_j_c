import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../app.constant';

@Injectable()
export class UserReasonService {
    public Url: string;

    constructor(public http: Http, public _config: Configuration) { }
    getuserReason(): Observable<any> {
        let url = this._config.Server + "reportReason";
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    saveReportReason(data): Observable<any> {
        let url = this._config.Server + "reportReason";
        let body = JSON.stringify(data);
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    editFormData(data): Observable<any> {
        let url = this._config.Server + "reportReason";
        let body = JSON.stringify(data);
        return this.http.put(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    deleteFeature(id): Observable<any> {
        let url = this._config.Server + "reportReason?reasonId=" + id;
        return this.http.delete(url, { headers: this._config.headers }).map(res => res.json());
    }
}