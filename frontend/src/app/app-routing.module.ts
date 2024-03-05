import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    { path: 'login', loadChildren: () => import('./web/common/pages/login/login.module').then(m => m.LoginModule) },
    {
        path: 'students', component: AppLayoutComponent,
        children: [
            { path: '', loadChildren: () => import('./web/admin/components/students/students.module').then(m => m.StudentsModule) },
        ]
    },
    { path: 'notfound', loadChildren: () => import('./web/common/pages/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: '**', redirectTo: '/login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
