import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../app.constant';
@Injectable()
export class AdminPolicyService {

    public Url: string;
    constructor(public http: Http, public _config: Configuration) { }

    getFileContent(): Observable<any> {
        let url = this._config.Server + "getConfigFilesData";
        let body = { configType: 2 };
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }

    gotoSubmitFile(content, type): Observable<any> {
        let url = this._config.Server + "websiteConfigFile";
        let body = { configData: content, configType: type };
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    gotoimageUpload(dataURI): Observable<any> {
        let url = this._config.Server + "fileUpload/binary";
        let body = { data: dataURI };
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    getImages(): Observable<any> {
        let url = this._config.Server + "getFiles";
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    getPageURL(): Observable<any> {
        let type = 1;
        let url = this._config.Server + "adminWebsitePagesURL?type=" + type.toString();
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
}
