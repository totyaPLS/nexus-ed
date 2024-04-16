import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubjectComponent} from "./subject.component";
import {BreadcrumbResolver} from "../../../../config/breadcrumb.resolver";
import {AnnouncementTypeGuard} from "../../../../config/guards/AnnouncementTypeGuard";

const routes: Routes = [
    { path: '', resolve: { breadcrumb: BreadcrumbResolver }, component: SubjectComponent},
    {
        path: ':announcementType',
        resolve: { breadcrumb: BreadcrumbResolver },
        loadChildren: () => import('./announcements/announcements.module').then(m => m.AnnouncementsModule),
        canActivate: [AnnouncementTypeGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [BreadcrumbResolver]
})
export class SubjectRoutingModule { }
