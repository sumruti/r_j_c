//============= importing NgModule and routes ================
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//============= importing user routes from user module ==================
import { UserRoutes } from './user/user.route';
import { AdminRoutes } from './admin/admin.route';
//=======import users routes from user module=========
import { AdminProblemRoutes } from './adminproblem/adminproblem.route';
import { UsersRoutes } from './users/users.routing';
import { SeoRoutes } from './SEO/seo.route';
import { WalletsRoutes } from './wallets/wallets.route';
//============ exporting the base route ===================
export const routes: Routes = [
    ...UserRoutes,
    //...UsersRoutes    
    ...AdminRoutes,
    ...AdminProblemRoutes,
    ...SeoRoutes,
    ...WalletsRoutes

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class MedTestRoutingModule { }