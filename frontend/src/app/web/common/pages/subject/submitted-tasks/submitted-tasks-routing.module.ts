import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubjectDetailsBreadcrumbResolver} from "../../../../../config/subject-details-breadcrumb.resolver";
import {SubmittedTasksComponent} from "./submitted-tasks.component";

const routes: Routes = [
    {
        path: '',
        resolve: { breadcrumb: SubjectDetailsBreadcrumbResolver },
        component: SubmittedTasksComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SubjectDetailsBreadcrumbResolver],
})
export class SubmittedTasksRoutingModule { }
