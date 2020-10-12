import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../app.constant';

@Injectable()
export class SubcategoriesService {
    public Url: string;
    constructor(public http: Http, public _config: Configuration) { }

    getSubcategory(categoryName): Observable<any> {
        let url = this._config.Server + "category/" + categoryName + "/subCategory";
        return this.http.get(url, { headers: this._config.headers }).map(res => res.json());
    }
    addSubCategory(subCategory): Observable<any> {
        let url = this._config.Server + "subCategory";
        let body = JSON.stringify(subCategory);
        // console.log("body", body);
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }

    deletesubcategory(subcategory): Observable<any> {
        let url = this._config.Server + "removeCategory";
        let body = { fieldName: subcategory, subCategory: true };
        return this.http.post(url, body, { headers: this._config.headers }).map(res => res.json());
    }
    editCategory(subCategory, newName, imageUrl): Observable<any> {
        let url = this._config.Server + "subCategory";
        let body = { subCategory: subCategory, newName: newName, imageUrl:imageUrl };
        // console.log("body", body);
        return this.http.put(url, body, { headers: this._config.headers }).map(res => res.json());
    }


}
