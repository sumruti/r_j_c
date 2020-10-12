import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../app.constant';

@Injectable()
export class SeoService {
    public Url: string;

    constructor(public http: Http, public _config: Configuration) { }

    getSEOSetting(type) {
        let url = this._config.Server + "homeSEO?type=" + type;
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    saveSetting(data) {
        let Url = this._config.Server + 'homeSEO';
        let body = JSON.stringify(data);
        return this.http.post(Url, body, { headers: this._config.headers }).map(res => res.json());
    }
    deleteSeo(type) {
        let url = this._config.Server + "homeSEO?type=" + type;
        return this.http.delete(url, { headers: this._config.headers }).map(res => res.json());
    }
    deleteSeo1(type, key) {
        let url = this._config.Server + "homeSEO?type=" + type + "&key=" + key;
        return this.http.delete(url, { headers: this._config.headers }).map(res => res.json());
    }
    getXmlFile() {
        let url = this._config.Server + "xmlFile";
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    saveXmlFile(text) {
        let url = this._config.Server + "xmlFile";
        return this.http.post(url, { data: text }, { headers: this._config.headers }).map(res => res.json());
    }

}