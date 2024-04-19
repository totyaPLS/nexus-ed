import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class BaseUrlInterceptorService implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const baseUrl = environment.apiUrl;
        const apiReq = request.clone({ url: `${baseUrl}${request.url}` });
        return next.handle(apiReq);
    }
}
