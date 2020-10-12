import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Headers } from '@angular/http';
declare var Buffer: any;
@Injectable()
export class Configuration {
   
    // token = localStorage.getItem('user') || '';

    Url='http://3.23.53.159:3000/api/';
    auth='Basic YmFzaWNBdXRoOiZqbm8tQDhhej13U28qTkhZVkdwRl5BUT80eW4zNlp2VzVUb1VDVU4rWEdPdUM/c3ojU0Ukb3hYVmJ3UUdQfDNXRnlqY1RBajJTSVJRbkxFfHZvXi18LUFUVjVGWlVmMio1QTNPaXV8X0VPTW1HPT0maUFwelFMM1I3SEhRaj9qdGIwbWMybVQkWSVJc3Jncnh2ZWxkI1peZzMtdWxefDB4QUlUZ2FuSXVGMjNKMHdhU2E2ejZhUF8rJURlNUxxdHVZJnB0eD9xaFp5U0VDZHlFXio0Ul5iKmhGalEtOT9jQ1NKTmZST3p6dEVZYlJ5Tj1TcUR5aGhwelNtbVB8RWI=';

    headers = new Headers({ 'Content-Type': 'application/json' });

    constructor() {
        // this.headers.append('token', this.token);
        this.headers.append('authorization', this.auth);
    }

    setItem(item, val) {
        // try {
        //     localStorage.setItem(item, val);
        // } catch (exception) {
        // this[item] = val;      
        Cookie.set(item, val, 1, "/");
        // }
    }
    getItem(item) {
        // try {
        //     return localStorage.getItem(item);
        // } catch (exception) {
        // return this[item];
        return Cookie.get(item);
        // }
    }

    removeItem(item) {
        // try {
        //     localStorage.removeItem(item);
        // } catch (exception) {
        // return this[item];
        Cookie.delete(item, "/");
        // }
    }

    clear() {
        // try {
        //     localStorage.clear();
        // } catch (exception) {
        //  Cookie.clear();
        Cookie.deleteAll("/");
        // }
    }

}