import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';

import { Http, Headers } from '@angular/http';



declare var localStorage: any;

@Injectable()
export class UserService {
    session: any;
    isLoggedin: boolean;
    redirectUrlAfterLogin: string;

    constructor(private router: Router, private _http: Http) {
        this.isLoggedin = false;
        this.checkStorage();
    }

    checkStorage() {
        if (localStorage.getItem('SessionData')) {
            this.isLoggedin = true;
            this.session = JSON.parse(localStorage.getItem('SessionData'));
        } else {
            this.isLoggedin = false;
            this.session = null;
        }
        
    }

    login(email: string, password: string) {
        if(email == 'admin@gmail.com' && password=='admin111') {
            this.saveToken(email,'12jhjsd11','admin',12);
            this.isLoggedin = true;
            return true;
        } else {
            console.log("not logged in");
            return false;
        }
    }

    saveToken(email: string, token: string, permission: string, id: number) {
        let sessionData = {
            email: email,
            token: token,
            permission: permission,           
        };
        if (localStorage.getItem('SessionData')) {
            localStorage.removeItem('SessionData');
        }
        this.session = sessionData;
        localStorage.setItem('SessionData', JSON.stringify(sessionData));
    }

    checkLoggedin() {
        return this.isLoggedin;
    }

    logout() {
        this.session = null;
        this.isLoggedin = false;
        localStorage.removeItem('SessionData');
    }
}