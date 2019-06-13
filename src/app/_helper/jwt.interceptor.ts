import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if(localStorage.getItem('currentUser') != 'undefined'){
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser != undefined && currentUser.data != undefined && currentUser.data.auth_token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: "Bearer " + currentUser.data.auth_token
                    }
                });
            }
        }

        return next.handle(request);
    }
}