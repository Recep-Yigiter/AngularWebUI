import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './Auth/guards/admin.guard';
import { LoginComponent } from './pages/auth/login/login.component';

import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: "", component: PagesComponent, canActivate: [AdminGuard],
    children: [{ path: '', loadChildren: () => import("../app/pages/pages.module").then(m => m.PagesModule), canActivate: [AdminGuard] }]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
