import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../app.constant';

@Injectable()
export class AdminNewsService {
    public Url: string;
    public headers = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({
        headers: this.headers
    });
    constructor(public http: Http, public _config: Configuration) { }

    getNews(): Observable<any> {
        let url = this._config.Server + "newsdetails";
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    subminNews(data): Observable<any> {
        let url = this._config.Server + "newsdetails";
        let body = JSON.stringify(data);
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    editNewsData(data): Observable<any> {
        let url = this._config.Server + "newsdetails";
        let body = JSON.stringify(data);
        return this.http.put(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    getodeleteNews(id): Observable<any> {
        let url = this._config.Server + "newsdetails?newsId=" + id;
        return this.http.delete(url, { headers: this._config.headers }).map(res => res.json());
    }


}