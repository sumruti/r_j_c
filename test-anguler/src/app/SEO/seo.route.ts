//importing all the essential modules
import { AuthGuard } from '../_guards/auth.guard';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from '../pages/pages.component';
import { HomeComponent } from './home/home.component';
import { HowItWorkComponent } from './howitworks/howitworks.component';
import { AboutComponent } from './about/about.component';
import { TermComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { HelpComponent } from './help/help.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SitemapComponent } from './sitemap/sitemap.component';
//=============== routing for user modules ======================
//=============== exporting the route to the main app =============
export const SeoRoutes: Routes = [

    {
        path: 'app',
        component: PagesComponent,
        children: [
            {
                path: 'register',
                component: RegisterComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Register'
                }
            },
            {
                path: 'home',
                component: HomeComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Home'
                }
            },
            {
                path: 'login',
                component: LoginComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Login'
                }
            },
            {
                path: 'how-it-works',
                component: HowItWorkComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'How it works'
                }
            },
            {
                path: 'about',
                component: AboutComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'About'
                }
            },
            {
                path: 'term',
                component: TermComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Terms'
                }
            },
            {
                path: 'privacy',
                component: PrivacyComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Privacy'
                }
            },
            {
                path: 'helps',
                component: HelpComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Help'
                }
            },
            {
                path: 'sitemap',
                component: SitemapComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Sitemap'
                }
            },
        ]
    },

];


