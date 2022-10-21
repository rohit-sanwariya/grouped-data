import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartGroupComponent } from './Commponents/chart-group/chart-group.component';
import { ChartPreviewComponent } from './Commponents/chart-preview/chart-preview.component';

const routes: Routes = [
  {
    path:'',pathMatch:'full',redirectTo:'preview'
  },
  {
    path:'preview',component:ChartPreviewComponent
  }
  ,{
    path:'group',component:ChartGroupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
