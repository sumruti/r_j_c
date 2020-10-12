//importing all the essential modules
import { AuthGuard } from '../_guards/auth.guard';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from '../pages/pages.component';
import { CustomerWalletsComponent } from './customerWallets/customerWallets.component';
import { AppWalletsComponent } from './appWallets/appWallets.component';
import { PgWalletsComponent } from './pgWallets/pgWallets.component';
//=============== routing for user modules ======================
//=============== exporting the route to the main app =============
export const WalletsRoutes: Routes = [
    {
        path: 'app',
        component: PagesComponent,
        children: [
            {
                path: 'customer-wallets',
                component: CustomerWalletsComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Customer wallets'
                }
            },
            {
                path: 'app-wallets',
                component: AppWalletsComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'App wallets'
                }
            },
            {
                path: 'pg-wallets',
                component: PgWalletsComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Pg wallets'
                }
            }
        ]
    }
]