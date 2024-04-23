import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubjectComponent} from "./subject.component";
import {BreadcrumbResolver} from "../../../../config/breadcrumb.resolver";
import {SubjectDetailTypeGuard} from "../../../../config/guards/SubjectDetailTypeGuard";
import {AnnouncementIDGuard} from "../../../../config/guards/AnnouncementIDGuard";

const routes: Routes = [
    { path: '', resolve: { breadcrumb: BreadcrumbResolver }, component: SubjectComponent},
    {
        path: 'grades',
        resolve: { breadcrumb: BreadcrumbResolver },
        loadChildren: () => import('./grades/grades.module').then(m => m.GradesModule),
    },
    {
        path: 'absences',
        resolve: { breadcrumb: BreadcrumbResolver },
        loadChildren: () => import('./absences/absences.module').then(m => m.AbsencesModule),
    },
    {
        path: 'diaries',
        resolve: { breadcrumb: BreadcrumbResolver },
        loadChildren: () => import('./diaries/diaries.module').then(m => m.DiariesModule),
    },
    {
        path: ':announcementType',
        resolve: { breadcrumb: BreadcrumbResolver },
        loadChildren: () => import('./announcements/announcements.module').then(m => m.AnnouncementsModule),
        canActivate: [SubjectDetailTypeGuard]
    },
    {
        path: ':announcementType/:announcementId',
        resolve: { breadcrumb: BreadcrumbResolver },
        loadChildren: () => import('./submitted-tasks/submitted-tasks.module').then(m => m.SubmittedTasksModule),
        canActivate: [SubjectDetailTypeGuard, AnnouncementIDGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [BreadcrumbResolver]
})
export class SubjectRoutingModule { }
