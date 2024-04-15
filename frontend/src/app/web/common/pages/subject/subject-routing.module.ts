import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubjectComponent} from "./subject.component";
import {BreadcrumbResolver} from "../../../../config/breadcrumb.resolver";
import {SubjectDetailGuard} from "../../../../config/guards/SubjectDetailGuard";

const routes: Routes = [
    { path: '', resolve: { breadcrumb: BreadcrumbResolver }, component: SubjectComponent},
    {
        path: ':detail',
        resolve: { breadcrumb: BreadcrumbResolver },
        loadChildren: () => import('./announcements/announcements.module').then(m => m.AnnouncementsModule),
        canActivate: [SubjectDetailGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [BreadcrumbResolver]
})
export class SubjectRoutingModule { }
