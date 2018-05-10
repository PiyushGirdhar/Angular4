import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './details/details.component';

const appRoutes: Routes = [
    {
        path: 'details',
        component: DetailsComponent
    },
    { 
        path: 'details/:id', 
        component: DetailsComponent 
    },
    {
        path: '**',
        component: DashboardComponent
    }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(appRoutes) ],
  providers: [],
  bootstrap: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }