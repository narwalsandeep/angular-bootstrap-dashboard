import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpParameterCodec,HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpFormEncodingCodec implements HttpParameterCodec {
    encodeKey(k: string): string { return encodeURIComponent(k).replace(/%20/g, '+'); }

    encodeValue(v: string): string { return encodeURIComponent(v).replace(/%20/g, '+'); }

    decodeKey(k: string): string { return decodeURIComponent(k.replace(/\+/g, ' ')); }

    decodeValue(v: string) { return decodeURIComponent(v.replace(/\+/g, ' ')); }
}

