import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubjectComponent} from "./subject.component";
import {BreadcrumbResolver} from "../../../../config/breadcrumb.resolver";
import {AnnouncementTypeGuard} from "../../../../config/guards/AnnouncementTypeGuard";
import {AnnouncementIDGuard} from "../../../../config/guards/AnnouncementIDGuard";

const routes: Routes = [
    { path: '', resolve: { breadcrumb: BreadcrumbResolver }, component: SubjectComponent},
    {
        path: ':announcementType',
        resolve: { breadcrumb: BreadcrumbResolver },
        loadChildren: () => import('./announcements/announcements.module').then(m => m.AnnouncementsModule),
        canActivate: [AnnouncementTypeGuard]
    },
    {
        path: ':announcementType/:announcementId',
        resolve: { breadcrumb: BreadcrumbResolver },
        loadChildren: () => import('./submitted-tasks/submitted-tasks.module').then(m => m.SubmittedTasksModule),
        canActivate: [AnnouncementTypeGuard, AnnouncementIDGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [BreadcrumbResolver]
})
export class SubjectRoutingModule { }
