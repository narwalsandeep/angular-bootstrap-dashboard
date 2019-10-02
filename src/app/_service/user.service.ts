import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClientModule,HttpParams,HttpHeaders } from '@angular/common/http'; 
import { HttpFormEncodingCodec } from './../_helper/http.form.codec';
import { ParamsHelper } from '../_helper/params';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
    /**
     * 
     */
    headers: HttpHeaders;
    
    /**
     * 
     * @param http 
     */
    constructor(
        private paramsHelper: ParamsHelper,
        private http: HttpClient
        ) { 

    }

    /**
     * 
     */
    _getBody(){
        return new HttpParams({ encoder: new HttpFormEncodingCodec() });
    }
  
    /**
     * 
     * @param _p 
     */
    create(_p) {
        let body = this.paramsHelper.make(this._getBody(), _p);
        return this.http.post(environment.server+"/user",body)
              .pipe(map(data => {
                  return data;
              }));
    }

    /**
     * 
     * @param _p 
     */
    read(_p = null){

        let body = this.paramsHelper.make(this._getBody(),_p);
        return this.http.get(environment.server+"/user/"+_p['id'])
            .pipe(map(data => {
                return data;
            }));

    }

    readAll(){

        return this.http.get("https://reqres.in/api/users?page=2")
            .pipe(map(data => {
                return data;
            }));

    }


    
}
