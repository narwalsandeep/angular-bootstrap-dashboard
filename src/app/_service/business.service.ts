import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClientModule,HttpParams,HttpHeaders } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { HttpFormEncodingCodec } from './../_helper/http.form.codec';
import { ParamsHelper } from '../_helper/params';
import { sample } from 'rxjs/internal/operators/sample';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  
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
        return this.http.post(environment.server+"/business",body, { headers: this.paramsHelper.makeHeadersWithAuth() })
              .pipe(map(data => {
                  return data;
              }));
    }

    /**
     * 
     * @param _p 
     */
    readAll(_p = null){

        let body = this.paramsHelper.make(this._getBody(),_p);
        return this.http.get(environment.server+"/business", { headers: this.paramsHelper.makeHeadersWithAuth() })
            .pipe(map(data => {
                return data;
            }));

    }

    /**
     * 
     * @param _p 
     */
    read(_p = null){

        return this.http.get(environment.server+"/business/"+_p['id'], { headers: this.paramsHelper.makeHeadersWithAuth() })
            .pipe(map(data => {
                return data;
            }));

    }

    /**
     * 
     * @param _p 
     */
    delete(_p = null){

        return this.http.delete(environment.server+"/business/"+_p['id'], { headers: this.paramsHelper.makeHeadersWithAuth() })
            .pipe(map(data => {
                return data;
            }));

    }

    
}
