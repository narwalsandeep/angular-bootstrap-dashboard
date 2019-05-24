import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
import { AuthService } from '../_service/auth.service';
 
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authService.signout();
                location.reload(true);
            }
            if (err.status === 404) {
                // auto logout if 401 response returned from api
                return throwError("Server has been shutdown, please try again later.");
            }
             
            const error = err.error;
            console.log(err.error);
            if(error){
                return throwError("Server Error occurred !");
            }
            else{
                return throwError("Unknown Error !");
            }
        }))
    }
}