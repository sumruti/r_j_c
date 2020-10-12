import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//import { AuthenticationService } from '../_services/authentication.service';
import { LoginComponentService } from '../user/components/loginComponent.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('adminToken')) {
            return true;
        }
        this.router.navigate(['/login']);//, { queryParams: { returnUrl: state.url }}
        return false;
    }
}