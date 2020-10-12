import { Injectable } from '@angular/core';
import { HttpModule,Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Configuration } from '../../../app.constant';

@Injectable()
export class Navbarservice {

    public Url: string;
//     public headers = new Headers({ 'Content-Type': 'application/json'});
//     public options = new RequestOptions({
//         headers: this.headers
//    });

    constructor( public http:Http, public _config:Configuration){}

    repass(data): Observable<any> {
        //let Email = JSON.parse(localStorage.getItem('adminToken'));
        //console.log(Email);
        let Url = this._config.Server + "admin/passwordUpdate";
        let body = JSON.stringify(data);
        return this.http.post(Url,body,{headers:this._config.headers}).map(res =>res.json());
    }



}