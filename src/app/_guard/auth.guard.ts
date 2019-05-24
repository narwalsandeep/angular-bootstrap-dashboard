import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthHelper } from '../_helper/auth';
import * as moment from "moment-timezone";


@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router,private auth: AuthHelper) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            let lc = "nb";
            if(this.auth.getUser().locale != undefined && this.auth.getUser().locale != ""){
                lc = this.auth.getUser().locale;
            }
            moment.locale(lc);
            
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/signin']);
        return false;
    }
}