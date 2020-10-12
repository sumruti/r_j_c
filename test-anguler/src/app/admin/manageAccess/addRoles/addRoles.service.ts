import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../../app.constant';

@Injectable()
export class addRoleService {
    public Url: string;

    constructor(public http: Http, public _config: Configuration) { }
    getRoles() {
        let url = this._config.Server + "roles";
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    getPages() {
        let url = this._config.Server + "pages";
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    editRole(data) {
        let url = this._config.Server + "roles";
        let body = JSON.stringify(data);
        return this.http.put(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    deleteRole(id) {
        let url = this._config.Server + "roles/" + id;
        return this.http.delete(url, { headers: this._config.headers }).map(res => res.json());
    }
    getUserAssociated(id) {
        let url = this._config.Server + "managers/" + id;
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    saveUserLink(id) {
        let url = this._config.Server + "userRoleLinked/" + id;
        return this.http.post(url, {}, { headers: this._config.headers }).map(res => res.json());
    }
}