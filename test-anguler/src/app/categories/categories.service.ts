import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../app.constant';

@Injectable()
export class CategoriesService {
    public Url: string;
    public headers = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({
        headers: this.headers
    });
    constructor(public http: Http, public _config: Configuration) { }

    getCategory() {
        let Url = this._config.Server + "getCategories";
        return this.http.get(Url, { headers: this._config.headers }).map(res => res.json());
    }
    deletecategory(category): Observable<any> {
        let url = this._config.Server + "removeCategory";
        let body = JSON.stringify(category);
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    addCategory(categories): Observable<any> {
        let url = this._config.Server + "adminCategory";
        let body = JSON.stringify(categories);
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    editCategory(oldName, newName, activeImg, deactiveImg, Dimage, Aimage): Observable<any> {
        let url = this._config.Server + "adminCategory";
        let body = {
            oldName: oldName,
            newName: newName,
            activeImg: activeImg,
            deactiveImg: deactiveImg,
            activeimage: Aimage,
            deactiveimage: Dimage
        };
        // console.log("body", body);
        return this.http.put(url, body, { headers: this._config.headers }).map(res => res.json());

    }
    imgUpload(data): Observable<any> {
        let url = this._config.Server + "fileUpload";
        let body = { uploadedImages: data };
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }


}
