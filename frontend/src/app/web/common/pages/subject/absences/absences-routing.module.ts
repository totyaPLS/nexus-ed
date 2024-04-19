import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AbsencesComponent} from "./absences.component";

const routes: Routes = [
    {
        path: '',
        data: { breadcrumb: 'Hiányzások' },
        component: AbsencesComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbsencesRoutingModule { }
