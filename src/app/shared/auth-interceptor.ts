import { Injectable } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService : AuthService){}
    intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
        console.log('Intercepted', req);
        // //Set header
        // const copiedReq = req.clone({headers:req.headers.set('','')});
        //Cannot directly change Request, copy a new one and sent the copy request.
        const copiedReq = req.clone({params:req.params.set('auth', this.authService.getToken())});
        return next.handle(copiedReq);
    }
}