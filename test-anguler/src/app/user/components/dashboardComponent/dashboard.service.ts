import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../../app.constant';
@Injectable()
export class DashboardService {
    public Url: string;
    constructor(public http: Http, public _config: Configuration) { }

    gotoGetCount(): Observable<any> {
        let url = this._config.Server + "dashboardCounts";
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    getChartData(type): Observable<any> {
        let url = this._config.Server + "userChartData?durationType=" + type;
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    getPostData(type):Observable<any>{
        let url = this._config.Server + "postChartData?durationType=" + type;
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
}