import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubjectComponent} from "./subject.component";
import {BreadcrumbResolver} from "../../../../config/breadcrumb.resolver";

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', resolve: { breadcrumb: BreadcrumbResolver }, component: SubjectComponent }
    ])],
    exports: [RouterModule],
    providers: [BreadcrumbResolver]
})
export class SubjectRoutingModule { }
