import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './Auth/guards/auth.guard';
import { StokYonetimiComponent } from './pages/stok-yonetimi/stok-yonetimi.component';
import { PersonelComponent } from './pages/personel/personel.component';
import { MuhasebeComponent } from './pages/muhasebe/muhasebe.component';
import { FinansComponent } from './pages/finans/finans.component';
import { AdministrationComponent } from './pages/auth/administration/administration.component';
import { AdminGuard } from './Auth/guards/admin.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { YonetimComponent } from './pages/yonetim/yonetim.component';
import { SatisComponent } from './pages/satis/satis.component';
import { SatinalmaComponent } from './pages/satinalma/satinalma.component';
import { UretimComponent } from './pages/uretim/uretim.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: "administration", component: AdministrationComponent, canActivate: [AdminGuard],
    children: [{ path: '', loadChildren: () => import("../app/pages/auth/administration/administration.module").then(m => m.AdministrationModule), canActivate: [AdminGuard] }]
  },
  {
    path: '',
    children: [
      {
        path: 'stok-yonetimi',
        component: StokYonetimiComponent,
        loadChildren: () =>
          import('../app/pages/stok-yonetimi/stok-yonetimi.module').then(
            (m) => m.StokYonetimiModule
          ),
      },
    ],canActivate:[authGuard]
  },
  {
    path: '',
    children: [
      {
        path: 'personel',
        component: PersonelComponent,
        loadChildren: () =>
          import('../app/pages/personel/personel.module').then(
            (m) => m.PersonelModule
          ),
      },
    ],canActivate:[authGuard]
  },
  {
    path: '',
    children: [
      {
        path: 'muhasebe',
        component: MuhasebeComponent,
        loadChildren: () =>
          import('../app/pages/muhasebe/muhasebe.module').then(
            (m) => m.MuhasebeModule
          ),
      },
    ],canActivate:[authGuard]
  },
  {
    path: '',
    children: [
      {
        path: 'finans',
        component: FinansComponent,
        loadChildren: () =>
          import('../app/pages/finans/finans.module').then(
            (m) => m.FinansModule
          ),
      },
    ],canActivate:[authGuard]
  },
  {
    path: '',
    children: [
      {
        path: 'satis',
        component: SatisComponent,
        loadChildren: () =>
          import('../app/pages/satis/satis.module').then(
            (m) => m.SatisModule
          ),
      },
    ],canActivate:[authGuard]
  },
  {
    path: '',
    children: [
      {
        path: 'satinalma',
        component: SatinalmaComponent,
        loadChildren: () =>
          import('../app/pages/satinalma/satinalma.module').then(
            (m) => m.SatinalmaModule
          ),
      },
    ],canActivate:[authGuard]
  },
  {
    path: '',
    children: [
      {
        path: 'uretim',
        component: UretimComponent,
        loadChildren: () =>
          import('../app/pages/uretim/uretim.module').then(
            (m) => m.UretimModule
          ),
      },
    ],canActivate:[authGuard]
  },
  {
    path: '',
    children: [
      {
        path: 'yonetim',
        component: YonetimComponent,
        loadChildren: () =>
          import('../app/pages/yonetim/yonetim.module').then(
            (m) => m.YonetimModule
          ),
      },
    ],canActivate:[authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
