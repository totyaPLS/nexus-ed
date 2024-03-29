import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import {ErrorInterceptorService} from "./config/error-interceptor.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {MessageModule} from "primeng/message";
import {ToastModule} from "primeng/toast";
import {CommonModule} from "@angular/common";
import {AuthInterceptorService} from "./config/auth-interceptor.service";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        MessageModule,
        ToastModule,
        CommonModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
