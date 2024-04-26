import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', },
  {
    path: '', component: LayoutComponent,
     children: [{ path: '', loadChildren: () => import("../app/pages/page.module").then(m => m.PageModule) }]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
