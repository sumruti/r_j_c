//================= importing all the required modules ==============
import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//============ importing the router module ==============
import { RouterModule } from '@angular/router';

//============ importing AddPlan Component ===============
import { AddPlanComponent } from './components/addPlan/addPlan.component';

//============ importing PlanList Component ================
import { PlanListComponent } from './components/planList/planList.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    AddPlanComponent,
    PlanListComponent
  ],  
  providers: [],
  exports: [
  ]
 
})
//=============exporting organaization module ==========================
export class PlanModule {
   
}