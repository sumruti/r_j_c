//importing all the essential modules
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importing all the custom components
//============ importing AddPlan Component ===============
import { AddPlanComponent } from './components/addPlan/addPlan.component';

//============ importing PlanList Component ================
import { PlanListComponent } from './components/planList/planList.component';

//=============== the parent component (for abstract i.e, common view) ===========
import { PagesComponent } from '../pages/pages.component';
 
//=============== routing for user modules ======================
//=============== exporting the route to the main app =============
export const PlanRoutes: Routes = [ 
 
  {
    path: 'app',
    component: PagesComponent,
    children : [
      {
       path: 'add-plan',
       component: AddPlanComponent,
       data:{
         title: 'Add Plan'
       }
      },
      {
       path: 'plan-list',
       component: PlanListComponent,
       data:{
         title: 'Plan List'
       }
      }
    ]
  }
];


