import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClientModule,HttpParams,HttpHeaders } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { HttpFormEncodingCodec } from './../_helper/http.form.codec';
import { ParamsHelper } from '../_helper/params';

/**
 * 
 */
@Injectable()
export class AuthService {

    /**
     * 
     */
    headers: HttpHeaders;

    /**
     * 
     * @param http 
     */
    constructor(
        private http: HttpClient,
        private params: ParamsHelper
        ) { 

        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    }

    /**
     * 
     */
    _getBody(){
        return new HttpParams({ encoder: new HttpFormEncodingCodec() });
    }

    /**
     * 
     * @param username 
     * @param password 
     */
    signin(_p) {
        let body = this.params.make(this._getBody(),_p);
        return this.http.put(environment.server+"/login",body, { headers: this.headers })
            .pipe(map(data => {
                let temp:any;
                temp = data;
                localStorage.setItem('currentUser', JSON.stringify(temp.payload));
                return data;
            }));
    }

    /**
     * 
     */
    signout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}