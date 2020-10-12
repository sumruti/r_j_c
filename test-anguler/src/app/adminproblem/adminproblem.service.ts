import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../app.constant';

@Injectable()
export class AdminProblemService {
    public Url: string;

    constructor(public http: Http, public _config: Configuration) { }
    // gotoSaveFeature(featureTitle): Observable<any> {
    //     let url = this._config.Server + "admin/addReportProblemFeatures";
    //     let body = { features: featureTitle };
    //     return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    // }
    getAdminProblem(): Observable<any> {
        let url = this._config.Server + "admin/addReportReson";
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    saveReportReason(data): Observable<any> {
        let url = this._config.Server + "admin/addReportReson";
        let body = JSON.stringify(data);
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    editFormData(data): Observable<any> {
        let url = this._config.Server + "admin/addReportReson";
        let body = JSON.stringify(data);
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    deleteFeature(id): Observable<any> {
        let url = this._config.Server + "admin/reportReson?featureId=" + id;
        return this.http.delete(url, { headers: this._config.headers }).map(res => res.json());
    }


}