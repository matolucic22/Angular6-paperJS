import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkingplaceComponent } from './workingplace/workingplace.component';

const routes: Routes = [
  {
    path:'',
    component: WorkingplaceComponent
  },
  {
    path:'circle',
    component: WorkingplaceComponent
  },
  {
    path:'freehand',
    component: WorkingplaceComponent
  },
  {
    path:'bezier',
    component: WorkingplaceComponent
  },
  {
    path:'closeandsimplypolygon',
    component: WorkingplaceComponent
  }, 
  {
    path:'moveaddsegpolygon',
    component: WorkingplaceComponent
  },
  {
    path:'editpolygon',
    component: WorkingplaceComponent
  },
  {
    path:'layers',
    component: WorkingplaceComponent
  },
  {
    path:'import',
    component: WorkingplaceComponent
  }   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
