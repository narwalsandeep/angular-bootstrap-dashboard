import { NullTemplateVisitor } from "@angular/compiler";
import { HttpClientModule,HttpParams,HttpHeaders } from '@angular/common/http'; 
import { headersToString } from "selenium-webdriver/http";
import { getDefaultService } from "selenium-webdriver/opera";

export class ParamsHelper {
    headers: HttpHeaders;


    constructor(
    ){

    }

    make(body = null, _p) {
        let temp:any;
        temp = body;
        if (_p != null) {
            return this._append(temp, _p);
        }

        return temp;
    }

    /**
    * 
    * @param temp 
    * @param _p 
    */
    _append(temp, _p) {

        Object.keys(_p).forEach(k => {
            let t = temp.append(k, _p[k]);
            // below line is important because temp only return
            // it does not update temp 
            temp = t;
        });
        return temp;

    }

}
