import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationCheckComponent } from './location-check/location-check.component';

const routes: Routes = [
  {
    path: 'location-check',
    component: LocationCheckComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
