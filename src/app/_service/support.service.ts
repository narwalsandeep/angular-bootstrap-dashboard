import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClientModule, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpFormEncodingCodec } from './../_helper/http.form.codec';

/**
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class SupportService {

  /**
   * 
   */
  headers: HttpHeaders;

  /**
   * 
   * @param http 
   */
  constructor(private http: HttpClient) {

    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  }

  /**
   * 
   */
  _getBody() {
    return new HttpParams({ encoder: new HttpFormEncodingCodec() });
  }

  /**
   * 
   * @param temp 
   * @param _p 
   */
  _append(temp, _p) {

    Object.keys(_p).forEach(k => {
      let t = temp.append(k, _p[k]);
      temp = t;
    });
    return temp;

  }

  /**
   * 
   */
  forgotPassord(_p) {
    let body = this._getBody().append("email", _p.email).append("domain",_p.domain);

    return this.http.post(environment.server + "/application/support/forgot-password", body, { headers: this.headers })
      .pipe(map(data => {
        return data;
      }));
  }

  /**
   * 
   */
  resetPassword(_p) {
    let body = this._getBody().append("password", _p.password).append("token",_p.token);

    return this.http.post(environment.server + "/application/support/reset-password", body, { headers: this.headers })
      .pipe(map(data => {
        return data;
      }));
  }
  /**
   * 
   */
  contact(_p) {
    let temp = this._getBody();        
    let body = this._append(temp,_p);

    return this.http.post(environment.server + "/application/support/contact", body, { headers: this.headers })
      .pipe(map(data => {
        return data;
      }));
  }


}