import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GradesComponent} from "./grades.component";
import {SubjectDetailsBreadcrumbResolver} from "../../../../../config/subject-details-breadcrumb.resolver";

const routes: Routes = [
    {
        path: '',
        data: { breadcrumb: 'Értékelések' },
        component: GradesComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradesRoutingModule { }
