//importing all the essential modules
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from '../pages/pages.component';
import { AdminProblemComponent } from './adminproblem.component';
import { UserReasonComponent } from './userReason/userReason.component';
import { PostReasonComponent } from './postReason/postreason.component';
export const AdminProblemRoutes: Routes = [

    {
        path: 'app',
        component: PagesComponent,
        children: [
            {
                path: 'report-reason',
                component: AdminProblemComponent,
                pathMatch: 'full'
            },
            {
                path: 'user-reason',
                component: UserReasonComponent,
            },
            {
                path: 'post-reason',
                component: PostReasonComponent,
            },
        ]
    },

];


