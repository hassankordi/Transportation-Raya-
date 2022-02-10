import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditComponent } from './credit/credit.component';

import { GraphDataComponent } from './graph-data/graph-data.component';
import { MappingComponent } from './mapping/mapping.component';
import { PlanningComponent } from './planning/planning.component';
import { SettingsComponent } from './settings/settings.component';
import { TripAnalysisComponent } from './trip-analysis/trip-analysis.component';
import { TripMonitorComponent } from './trip-monitor/trip-monitor.component';

const routes: Routes = [ 
 
  {
    path: 'mapping',
    component: MappingComponent,
    pathMatch: 'full',
  },
  {
    path: 'planning',
    component: PlanningComponent,
    pathMatch: 'full',
  },
  {
    path: 'trip-monitor',
    component: TripMonitorComponent,
    pathMatch: 'full',
  },
  {
    path: 'trip-analysis',
    component: TripAnalysisComponent,
    pathMatch: 'full',
  },
  {
    path: 'settings',
    component: SettingsComponent,
    pathMatch: 'full',
  },
  {
    path: 'graph',
    component: GraphDataComponent,
    pathMatch: 'full',
  }, 
  {
    path: 'credits',
    component: CreditComponent,
    pathMatch: 'full',
  }, 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
