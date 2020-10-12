import { Component, ElementRef, ViewEncapsulation, HostListener } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AppState } from "../../../app.state";
import { AppConfig } from "../../../app.config";
import { SidebarService } from './sidebar.service';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
@Component({
    selector: 'sidebar',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./sidebar.scss'],
    templateUrl: './sidebar.html',
    providers: [SidebarService]
})

export class Sidebar {
    public config: any;

    public menuItems: Array<any>;
    public menuData: Array<any>;
    public menuHeight: number;
    public isMenuCollapsed: boolean = false;
    public isMenuShouldCollapsed: boolean = false;

    public showHoverElem: boolean;
    public hoverElemHeight: number;
    public hoverElemTop: number;
    public showHoverElemName: boolean;
    roleData: any;
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private _elementRef: ElementRef,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _titleService: Title,
        private _appConfig: AppConfig,
        private _state: AppState,
        private _sidebarService: SidebarService) {

        this.config = this._appConfig.config;
        this.menuData = this._sidebarService.getMenuItems();
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });

        var token = localStorage.getItem('adminToken');
        var adminType = this.jwtHelper.decodeToken(token);
        this.menuItems = [];
        if (adminType.accessLevel == 1) {
            this.menuData.forEach(ele => {
                ele.visible = true;
            });
            this.menuItems = this.menuData;
        }
        this.menuData.forEach(e => {
            e.visible = true;
        });
        if (adminType.accessLevel == 2) {
            var role = sessionStorage.getItem('role');
            this.roleData = JSON.parse(role);
            for (var x1 in this.roleData) {
                this.menuData.forEach(ele => {
                    if (ele.routerLink == 'manage-access') {
                        // let xx = this.menuData.indexOf(ele);
                        // this.menuData.splice(xx, 1);
                        ele.visible = false;
                        this.menuItems = this.menuData;
                    }
                    if (ele.routerLink == x1 && this.roleData[x1] == 0) {
                        // let indexx = this.menuData.indexOf(ele);
                        // this.menuData.splice(indexx, 1);
                        ele.visible = false;

                        this.menuItems = this.menuData;
                    } else {
                        this.menuItems = this.menuData;
                    }
                })
            }
        }
        this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
                if (width <= 768) {
                    this._state.notifyDataChanged('menu.isCollapsed', true);
                }
                window.scrollTo(0, 0);
                // var currentMenu = event.url.substring(event.url.lastIndexOf('/') + 1);
                var currentMenu = this._activatedRoute.snapshot.firstChild.data['title'];
                this._state.notifyDataChanged('menu.activeLink', currentMenu);
                this._titleService.setTitle(this.config.name + ' > ' + currentMenu);

                // this._activatedRoute.children.forEach((route: ActivatedRoute) => {
                //     let activeRoute: ActivatedRoute = route;
                //     while (activeRoute.firstChild) {
                //         activeRoute = activeRoute.firstChild;
                //     }
                //     console.log(activeRoute.snapshot.data['title']);
                // });             
            }
        });
    }

    public ngOnInit(): void {
        if (this._shouldMenuCollapse()) {
            this.menuCollapse();
        }
        this.updateSidebarHeight();
    }

    public ngOnDestroy(): void {
        // console.log('destroyed!!!!');
    }

    @HostListener('window:resize')
    public onWindowResize(): void {
        var isMenuShouldCollapsed = this._shouldMenuCollapse();

        if (this.isMenuShouldCollapsed !== isMenuShouldCollapsed) {
            this.menuCollapseStateChange(isMenuShouldCollapsed);
        }
        this.isMenuShouldCollapsed = isMenuShouldCollapsed;
        this.updateSidebarHeight();
    }

    private _shouldMenuCollapse(): boolean {
        return window.innerWidth <= 768;
    }

    public menuCollapse(): void {
        this.menuCollapseStateChange(true);
    }

    public menuCollapseStateChange(isCollapsed: boolean): void {
        this.isMenuCollapsed = isCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    }

    public menuExpand(): void {
        this.menuCollapseStateChange(false);
    }

    public hoverItem($event): void {
        this.showHoverElem = true;
        this.showHoverElemName = true;
        // console.log(this.showHoverElem);
        this.hoverElemHeight = $event.currentTarget.clientHeight;
        // TODO: get rid of magic 60 constant
        this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 60;
    }

    public updateSidebarHeight(): void {
        // TODO: get rid of magic 84 constant
        this.menuHeight = this._elementRef.nativeElement.children[0].clientHeight - 84;
    }

    public collapseMenu($event, item): boolean {
        var link = jQuery($event.currentTarget);
        if (this.isMenuCollapsed) {
            this.menuExpand();
            if (!item.expanded) {
                item.expanded = true;
                this.menuItems.forEach((menuItem) => {
                    if (menuItem != item) {
                        menuItem.expanded = false;
                    }
                });
            }
        } else {
            // jQuery('.sidebar-item-expanded').click(function(){
            //         jQuery('.sidebar-sublist').css("display","none");
            //     })
            if (!link.closest('.sidebar-item-expanded').length) {
                jQuery("ul.nav-sidebar li").each(function (index) {
                    if (jQuery(this).closest("li").children("ul").length) {
                        jQuery(this).closest("li").children("ul").slideUp();
                        jQuery(this).closest("li").removeClass("sidebar-item-expanded");
                    }
                });
            }
            link.next().slideDown();
            if (item.subMenu) {
                link.closest("li").addClass("sidebar-item-expanded");
            }
        }
        return false;
    }


    //  public collapseMenu($event, item):boolean{
    //     var link = jQuery($event.currentTarget);
    //     if (this.isMenuCollapsed) {
    //         this.menuExpand();         
    //         if (!item.expanded) {
    //             item.expanded = true;
    //         }       
    //     } else {
    //         item.expanded = !item.expanded;
    //         link.next().slideToggle();                      
    //     }
    //     return false;
    // }




}