import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DiariesComponent} from "./diaries.component";

const routes: Routes = [
    {
        path: '',
        data: { breadcrumb: 'Naplózások' },
        component: DiariesComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiariesRoutingModule { }
