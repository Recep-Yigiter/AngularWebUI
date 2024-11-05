import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { FaturaComponent } from './pages/fatura/fatura.component';

import { SatinalmaComponent } from './pages/satinalma/satinalma.component';
import { SatisComponent } from './pages/satis/satis.component';
import { IrsaliyeComponent } from './pages/irsaliye/irsaliye.component';
import { LoginComponent } from './pages/Auth/login/login.component';
import { authGuard } from './Auth/guards/auth.guard';
import { AdminGuard } from './Auth/guards/admin.guard';
import { AdministrationComponent } from './pages/administration/administration.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', },
  { path: 'login', component: LoginComponent },

  { path: '', component: PagesComponent, canActivate: [authGuard] },
  { path: 'menu', component: PagesComponent, canActivate: [authGuard] },
  

  {
    path: "administration", component: AdministrationComponent, canActivate: [AdminGuard],
    children: [{ path: '', loadChildren: () => import("../app/pages/administration/administration.module").then(m => m.AdministrationModule), canActivate: [AdminGuard] }]
  },
  { path: '', loadChildren: () => import("../app/pages/page.module").then(m => m.PageModule), canActivate: [AdminGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
