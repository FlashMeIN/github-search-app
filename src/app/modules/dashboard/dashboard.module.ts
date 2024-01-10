import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: '', redirectTo: 'search', pathMatch: 'full'},
      { path: 'search', loadChildren: () => import('../search/search.module').then(m => m.SearchModule) },
      { path: 'history', loadChildren: () => import('../history/history.module').then(m => m.HistoryModule) }
    ]),
    CommonModule
  ]
})
export class DashboardModule { }
