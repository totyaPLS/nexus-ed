import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubjectComponent} from "./subject.component";

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: SubjectComponent }
    ])],
    exports: [RouterModule]
})
export class SubjectRoutingModule { }
