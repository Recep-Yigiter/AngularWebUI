import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { StokComponent } from './pages/stok/stok.component';
import { FaturaComponent } from './pages/fatura/fatura.component';
import { SiparisComponent } from './pages/siparis/siparis.component';
import { TeklifComponent } from './pages/teklif/teklif.component';
import { SatinalmaComponent } from './pages/satinalma/satinalma.component';
import { SatisComponent } from './pages/satis/satis.component';
import { IrsaliyeComponent } from './pages/irsaliye/irsaliye.component';
import { LoginComponent } from './Auth/login/login.component';
import { authGuard } from './Auth/guard/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', },
  { path: 'login', component:LoginComponent },




  { path: '', component: PagesComponent,canActivate:[authGuard] },
  { path: 'menu', component: PagesComponent,canActivate:[authGuard]},
  { path: 'menu', children: [{ path: '', loadChildren: () => import("../app/pages/page.module").then(m => m.PageModule) ,canActivate:[authGuard]}] },

  { path: 'stok', component: StokComponent, children: [{ path: '', loadChildren: () => import("../app/pages/stok/stok.module").then(m => m.StokModule) }],canActivate:[authGuard] },
  { path: 'depo', component: StokComponent, children: [{ path: '', loadChildren: () => import("../app/pages/depo/depo.module").then(m => m.DepoModule) }] ,canActivate:[authGuard]},
  { path: 'hizmet', component: StokComponent, children: [{ path: '', loadChildren: () => import("../app/pages/hizmet/hizmet.module").then(m => m.HizmetModule) }] ,canActivate:[authGuard]},
  { path: 'masraf', component: StokComponent, children: [{ path: '', loadChildren: () => import("../app/pages/masraf/masraf.module").then(m => m.MasrafModule) }] ,canActivate:[authGuard]},
  { path: 'birim', component: StokComponent, children: [{ path: '', loadChildren: () => import("../app/pages/birim/birim.module").then(m => m.BirimModule) }] ,canActivate:[authGuard]},
  {
    path: 'fatura', component: FaturaComponent,canActivate:[authGuard],
    children: [{ path: '', loadChildren: () => import("../app/pages/fatura/fatura.module").then(m => m.FaturaModule) ,canActivate:[authGuard],},]
  },
  {
    path: 'irsaliye', component: IrsaliyeComponent,canActivate:[authGuard],
    children: [{ path: '', loadChildren: () => import("../app/pages/irsaliye/irsaliye.module").then(m => m.IrsaliyeModule) },]
  },
  {
    path: 'siparis', component: SiparisComponent,canActivate:[authGuard],
    children: [{ path: '', loadChildren: () => import("../app/pages/siparis/siparis.module").then(m => m.SiparisModule),canActivate:[authGuard] },]
  },
  {
    path: 'teklif', component: TeklifComponent,canActivate:[authGuard],
    children: [{ path: '', loadChildren: () => import("../app/pages/teklif/teklif.module").then(m => m.TeklifModule) ,canActivate:[authGuard]},]
  },
  {
    path: 'satinalma', component: SatinalmaComponent,canActivate:[authGuard],
    children: [{ path: '', loadChildren: () => import("../app/pages/satinalma/satinalma.module").then(m => m.SatinalmaModule) ,canActivate:[authGuard]},]
  },
  {
    path: 'satis', component: SatisComponent,canActivate:[authGuard],
    children: [{ path: '', loadChildren: () => import("../app/pages/satis/satis.module").then(m => m.SatisModule) ,canActivate:[authGuard]},]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
