import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {Admin} from "./config/guards/Admin";
import {Guest} from "./config/guards/Guest";
import {AuthGuard} from "./config/guards/AuthGuard";
import {AllExceptAdmin} from "./config/guards/AllExceptAdmin";

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
        path: '',
        component: AppLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'timetable',
                loadChildren: () => import('./web/common/pages/timetable/calendar.app.module').then(m => m.CalendarAppModule),
                canActivate: [AllExceptAdmin]
            },
            {
                path: 'users',
                loadChildren: () => import('./web/admin/components/users/users.module').then(m => m.UsersModule),
                canActivate: [Admin]
            },
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
