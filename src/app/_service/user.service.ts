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
    createOrUpdate(_p) {
        let body = this.paramsHelper.make(this._getBody(), _p);
        return this.http.post(environment.server+"/user",body, { headers: this.paramsHelper.makeHeadersWithAuth() })
              .pipe(map(data => {
                  return data;
              }));
    }

    /**
     * 
     * @param _p 
     */
    readAll(_p = null){

        return this.http.get(environment.server+"/user?user_type="+_p.user_type+"&business_id="+_p.business_id, { headers: this.paramsHelper.makeHeadersWithAuth() })
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
        return this.http.get(environment.server+"/user/"+_p['id'], { headers: this.paramsHelper.makeHeadersWithAuth() })
            .pipe(map(data => {
                return data;
            }));

    }

    /**
     * 
     * @param _p 
     */
    attachDevice(_p = null){

        let body = this.paramsHelper.make(this._getBody(),_p);
        return this.http.put(environment.server+"/user/attach-device",body, { headers: this.paramsHelper.makeHeadersWithAuth() })
            .pipe(map(data => {
                return data;
            }));
    }

    /**
     * 
     * @param _p 
     */
    ejectDevice(_p = null){

        let body = this.paramsHelper.make(this._getBody(),_p);
        return this.http.put(environment.server+"/user/eject-device", body, { headers: this.paramsHelper.makeHeadersWithAuth() })
            .pipe(map(data => {
                return data;
            }));

    }

    /**
     * 
     * @param _p 
     */
    delete(_p = null){

        let body = this.paramsHelper.make(this._getBody(),_p);
        return this.http.delete(environment.server+"/user/"+_p['id'], { headers: this.paramsHelper.makeHeadersWithAuth() })
            .pipe(map(data => {
                return data;
            }));

    }

    
}
