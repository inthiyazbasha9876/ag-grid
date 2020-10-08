import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AggridComponent } from './aggrid/aggrid.component';

const routes: Routes = [
  {path:'',redirectTo:'aggrid',pathMatch:'full'},
  {path:'aggrid',component:AggridComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
