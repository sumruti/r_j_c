import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../app.constant';

@Injectable()
export class manageAccessService {
    public Url: string;

    constructor(public http: Http, public _config: Configuration) { }
    getPages() {
        let url = this._config.Server + "pages";
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    getRoles() {
        let url = this._config.Server + "roles";
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    addUser(data) {
        let url = this._config.Server + "manager";
        let body = JSON.stringify(data);
        return this.http.put(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    getUser() {
        let url = this._config.Server + "managers";
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    deleteUser(name) {
        let url = this._config.Server + "manager/" + name;
        return this.http.delete(url, { headers: this._config.headers }).map(res => res.json());
    }
}