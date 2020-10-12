import { Component, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';

@Component({
    selector: 'pages',
    encapsulation: ViewEncapsulation.None,
    providers: [AppState],
    styleUrls: ['./pages.scss'],
    template: `
        <navbar></navbar>
        <div class="container-fluid">         
            <div class="row"> 
                <sidebar></sidebar>
                <div class="main-wrapper"  [ngClass]="{'menu-collapsed': isMenuCollapsed}"> 
                    <div class="az-overlay" *ngIf="!isMenuCollapsed" (click)="hideMenu()"></div>
                    <div class="main">
                        <div class="main-content">
                         <div class="listBreadcrumb">
                            <ol class="breadcrumb">
                            <li *ngFor="let name of title;let i= index;">
                               <a routerLink="./{{name}}" *ngIf="i != 0 && i != 1"> 
                               <span class="" *ngIf="i != 0 && i != 1 && i != 2">/</span>
                               {{name}}
                               </a>
                            </li>
                            <li class="pull-right"><button type="button" id="bkBtn" class="btn btn-default mainBtn" (click)="gotoBack();">Back</button></li>
                            </ol>
                            
                        </div>
                          <router-outlet></router-outlet>
                        </div>
                        
                    </div> 

                    <footer class="footer text-xs-center clearfix">
                       <div class="footer-main pull-left  clearfix">
                            
                        </div>                    
                    </footer>

                    <back-top position="200"></back-top>

                </div>
            </div>
        </div>
    `
})

export class PagesComponent {
    isMenuCollapsed: boolean = false;
    title: any;

    constructor(private _state: AppState, private _location: Location, private _router: Router) {
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }
    jwtHelper: JwtHelper = new JwtHelper();
    public isAdmin: any;
    

    ngOnInit() {
        var token = localStorage.getItem('adminToken');
        
        if (token != null) {
            var adminType = this.jwtHelper.decodeToken(token);

            if (adminType.accessLevel == 1) {
                this.isAdmin = true;
            } else {
                this.isAdmin = false;
            }
        }
        this.getCurrentPageName();
        this._router.events
            .subscribe(
            (url: any) => {
                let _ruta = "";
                url.url.split("/").forEach(element => {
                    if (element !== "" && _ruta === "")
                        _ruta = "/" + element;
                });
                // console.log("route: "+_ruta); //<<<---- Root path
                // console.log("to URL:"+url.url); //<<<---- Destination URL                    
                var decodeURL = decodeURIComponent(this._router.url);
                let urlTitle = decodeURL.split("/");
                this.title = urlTitle;
        // console.log("this.title[2]", this.title[2]);
        
                // console.log(this.title);
                if (this.title[2] == 'dashboard') {
                    jQuery("#bkBtn").hide();
                } else {
                    jQuery("#bkBtn").show();
                }
            });
    }
    gotoBack() {
        this._location.back();
    }


    getCurrentPageName(): void {
        var url = this._location.path();
        // var currentPage = url.substring(url.lastIndexOf('/') + 1);
        //this._state.notifyDataChanged('menu.activeLink', currentPage); 
        setTimeout(function () {
            window.scrollTo(0, 0);
            jQuery('a[href="#' + url + '"]').closest("li").closest("ul").closest("li").addClass("sidebar-item-expanded");
        });
    }

    public hideMenu(): void {
        this._state.notifyDataChanged('menu.isCollapsed', true);
    }


}