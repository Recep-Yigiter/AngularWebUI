import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdministrationComponent } from '../pages/auth/administration/administration.component';
import { AdminGuard } from '../Auth/guards/admin.guard';
import { StokYonetimiComponent } from '../pages/stok-yonetimi/stok-yonetimi.component';
import { authGuard } from '../Auth/guards/auth.guard';
import { PersonelComponent } from '../pages/personel/personel.component';
import { MuhasebeComponent } from '../pages/muhasebe/muhasebe.component';
import { FinansComponent } from '../pages/finans/finans.component';
import { SatisComponent } from '../pages/satis/satis.component';
import { SatinalmaComponent } from '../pages/satinalma/satinalma.component';
import { UretimComponent } from '../pages/uretim/uretim.component';
import { YonetimComponent } from '../pages/yonetim/yonetim.component';
import { IsGrantedDirective } from '../Auth/is-granted.directive';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [PagesComponent, IsGrantedDirective,],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'administration',
        component: AdministrationComponent,
        canActivate: [AdminGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import(
                '../pages/auth/administration/administration.module'
              ).then((m) => m.AdministrationModule),
            canActivate: [AdminGuard],
          },
        ],
      },

      {
        path: '',
        children: [
          {
            path: 'stok-yonetimi',
            component: StokYonetimiComponent,
            loadChildren: () =>
              import('../pages/stok-yonetimi/stok-yonetimi.module').then(
                (m) => m.StokYonetimiModule
              ),
          },
        ],
        canActivate: [authGuard],
      },

      {
        path: '',
        children: [
          {
            path: 'personel',
            component: PersonelComponent,
            loadChildren: () =>
              import('../pages/personel/personel.module').then(
                (m) => m.PersonelModule
              ),
          },
        ],
        canActivate: [authGuard],
      },

      {
        path: '',
        children: [
          {
            path: 'muhasebe',
            component: MuhasebeComponent,
            loadChildren: () =>
              import('../pages/muhasebe/muhasebe.module').then(
                (m) => m.MuhasebeModule
              ),
          },
        ],
        canActivate: [authGuard],
      },

      {
        path: '',
        children: [
          {
            path: 'finans',
            component: FinansComponent,
            loadChildren: () =>
              import('../pages/finans/finans.module').then(
                (m) => m.FinansModule
              ),
          },
        ],
        canActivate: [authGuard],
      },

      {
        path: '',
        children: [
          {
            path: 'satis',
            component: SatisComponent,
            loadChildren: () =>
              import('../pages/satis/satis.module').then((m) => m.SatisModule),
          },
        ],
        canActivate: [authGuard],
      },

      {
        path: '',
        children: [
          {
            path: 'satinalma',
            component: SatinalmaComponent,
            loadChildren: () =>
              import('../pages/satinalma/satinalma.module').then(
                (m) => m.SatinalmaModule
              ),
          },
        ],
        canActivate: [authGuard],
      },

      {
        path: '',
        children: [
          {
            path: 'uretim',
            component: UretimComponent,
            loadChildren: () =>
              import('../pages/uretim/uretim.module').then(
                (m) => m.UretimModule
              ),
          },
        ],
        canActivate: [authGuard],
      },

      {
        path: '',
        children: [
          {
            path: 'yonetim',
            component: YonetimComponent,
            loadChildren: () =>
              import('../pages/yonetim/yonetim.module').then(
                (m) => m.YonetimModule
              ),
          },
        ],
        canActivate: [authGuard],
      },
    ]),
  ],
})
export class PagesModule {}
