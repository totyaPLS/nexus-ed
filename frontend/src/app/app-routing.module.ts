import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {Admin} from "./config/guards/Admin";
import {Guest} from "./config/guards/Guest";

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: "full" },
    {
        path: 'login',
        loadChildren: () => import('./web/common/pages/login/login.module').then(m => m.LoginModule),
        canActivate: [Guest]
    },
    {
        path: 'users',
        component: AppLayoutComponent,
        loadChildren: () => import('./web/admin/components/users/users.module').then(m => m.UsersModule),
        canActivate: [Admin]
    },
    { path: 'notfound', loadChildren: () => import('./web/common/pages/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: '**', redirectTo: '/login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
