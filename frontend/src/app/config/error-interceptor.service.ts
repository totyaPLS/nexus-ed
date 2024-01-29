import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {MessageService} from "primeng/api";

@Injectable({providedIn: 'root'})
export class ErrorInterceptorService implements HttpInterceptor {

    constructor(private messageService: MessageService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(() => {
                this.messageService.add({ severity: 'error', summary: 'Hiba', detail: 'Belső szerver hiba'},);
                return throwError(() => new Error('Something went wrong. Please try again later.'));
            })
        );
    }
}
