import { Injectable } from '@angular/core';

@Injectable()
export class PlanService {
   public plans : any;
   constructor(){
       this.plans=[
           { planName:'Premium',id:'1',planBillingCycle:'Monthly', costPerUnit:'100'},
           { planName:'Basic',id:'2',planBillingCycle:'Monthly,Quaterly', costPerUnit:'100'}];
   }

    getPlanList(): void{
        return this.plans;
    }
    addPlan(data):void{
    //   console.log("New Plan" + data.name);
    } 
}
