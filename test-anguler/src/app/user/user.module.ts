//================= importing all the required modules ==============
import { NgModule,ModuleWithProviders } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//============ importing the router module ==============
import { RouterModule } from '@angular/router';

//============ importing login component, and dashboard component ===============
import { LogInComponent } from './components/loginComponent/loginComponent.component';
// import { DashBoardComponent } from './components/dashboardComponent/dashboard.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ChartsModule
  ],
  declarations: [
    LogInComponent,
    // DashBoardComponent
  ],  
  providers: [],
  exports: [
  ]
 
})
export class UserModule {
   
}