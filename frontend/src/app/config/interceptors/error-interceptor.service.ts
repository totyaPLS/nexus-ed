import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {empty, Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {MessageService} from "primeng/api";

@Injectable({providedIn: 'root'})
export class ErrorInterceptorService implements HttpInterceptor {

    constructor(private messageService: MessageService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((e: any) => {
                if (e.error) {
                    this.messageService.add({ severity: 'error', summary: 'Server error', detail: e.error.message},);
                    return throwError(() => new Error(e.error.message));
                } else if (e.status === 403) {
                    this.messageService.add({ severity: 'error', summary: 'Server error', detail: 'Permission denied'},);
                    return throwError(() => new Error('Permission denied'));
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Server error', detail: 'An error occurred on the server. Please try again later.'},);
                    return throwError(() => new Error('An error occurred on the server. Please try again later.'));
                }
            })
        );
    }
}
