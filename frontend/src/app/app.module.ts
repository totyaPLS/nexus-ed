import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import {ErrorInterceptorService} from "./config/error-interceptor.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {MessageModule} from "primeng/message";
import {ToastModule} from "primeng/toast";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        MessageModule,
        ToastModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
