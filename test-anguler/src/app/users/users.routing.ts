import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './component/userslist/users.component';
import { PagesComponent } from '../pages/pages.component';
import { AuthGuard } from '../_guards/auth.guard';


export const UsersRoutes: Routes = [
{
    path: 'app',
    component: PagesComponent,
    children : [
        {
            path:'registed-users',
            component: UsersListComponent,
            canActivate: [AuthGuard],
            data:{
                title:'Users List'
            }
        },
    ]
}
];