import { HttpEvent,HttpHandler,HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

export class LoggingInterceptor implements HttpInterceptor {
    intercept(req:HttpRequest<any>, next:HttpHandler) : Observable<HttpEvent<any>> {
        //do(): execute some code on any data which go from that Observable
        //without consume it. While subscribe() will consume Observable.
        return next.handle(req).do(
            (event:HttpEvent<any>) => {
                console.log("Logging interceptor", event);
            }
        )
    }
}