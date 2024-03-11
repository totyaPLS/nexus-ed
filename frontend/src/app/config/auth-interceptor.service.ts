import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = localStorage.getItem('auth_token');

        if (authToken) {
            const authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            return next.handle(authReq);
        }

        return next.handle(req);
    }
}
