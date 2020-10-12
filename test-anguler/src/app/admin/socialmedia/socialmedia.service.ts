import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../app.constant';

@Injectable()
export class SocialMediaService {
    public Url: string;

    constructor(public http: Http, public _config: Configuration) { }
    getAllLink(): Observable<any> {
        let url = this._config.Server + "socialMedia";
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    saveSocialMedia(data): Observable<any> {
        let url = this._config.Server + "socialMedia";
        let body = JSON.stringify(data);
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    editFormData(data): Observable<any> {
        let url = this._config.Server + "socialMedia";
        let body = JSON.stringify(data);
        return this.http.put(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    deleteLinkData(id): Observable<any> {
        let url = this._config.Server + "socialMedia?socialId=" + id;
        return this.http.delete(url, { headers: this._config.headers }).map(res => res.json());
    }
}