import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AnnouncementsComponent} from "./announcements.component";
import {BreadcrumbResolver} from "../../../../../config/breadcrumb.resolver";
import {SubjectDetailsBreadcrumbResolver} from "../../../../../config/subject-details-breadcrumb.resolver";

const routes: Routes = [
    {
        path: '',
        resolve: { breadcrumb: SubjectDetailsBreadcrumbResolver },
        component: AnnouncementsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SubjectDetailsBreadcrumbResolver],
})
export class AnnouncementsRoutingModule { }
