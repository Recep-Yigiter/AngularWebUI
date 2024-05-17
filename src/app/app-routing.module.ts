import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { PagesComponent } from './pages/pages.component';
import { StokComponent } from './pages/stok/stok/stok.component';
import { FaturaComponent } from './pages/fatura/fatura.component';
import { SiparisComponent } from './pages/siparis/siparis.component';
import { TeklifComponent } from './pages/teklif/teklif.component';
import { SatinalmaComponent } from './pages/satinalma/satinalma.component';
import { SatisComponent } from './pages/satis/satis.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', },



  { path: '', component: PagesComponent, },
  { path: 'menu', component: PagesComponent, },
  { path: 'menu', children: [{ path: '', loadChildren: () => import("../app/pages/page.module").then(m => m.PageModule) }] },

  { path: 'stok', component: StokComponent, children: [{ path: '', loadChildren: () => import("../app/pages/stok/stok/stok.module").then(m => m.StokModule) }] },
  { path: 'depo', component: StokComponent, children: [{ path: '', loadChildren: () => import("../app/pages/stok/depo/depo.module").then(m => m.DepoModule) }] },
  { path: 'hizmet', component: StokComponent, children: [{ path: '', loadChildren: () => import("../app/pages/stok/hizmet/hizmet.module").then(m => m.HizmetModule) }] },
  { path: 'masraf', component: StokComponent, children: [{ path: '', loadChildren: () => import("../app/pages/stok/masraf/masraf.module").then(m => m.MasrafModule) }] },
  { path: 'birim', component: StokComponent, children: [{ path: '', loadChildren: () => import("../app/pages/stok/birim/birim.module").then(m => m.BirimModule) }] },

  {

    path: 'fatura', component: FaturaComponent, children: [
      { path: '', loadChildren: () => import("../app/pages/fatura/fatura.module").then(m => m.FaturaModule) },

    ]
  },


  {
    path: 'siparis', component: SiparisComponent,
    children: [{ path: '', loadChildren: () => import("../app/pages/siparis/siparis.module").then(m => m.SiparisModule) },]
  },

  {
    path: 'teklif', component: TeklifComponent,
    children: [{ path: '', loadChildren: () => import("../app/pages/teklif/teklif.module").then(m => m.TeklifModule) },]
  },



  {
    path: 'satinalma', component: SatinalmaComponent,
    children: [{ path: '', loadChildren: () => import("../app/pages/satinalma/satinalma.module").then(m => m.SatinalmaModule) },]
  },
  {
    path: 'satis', component: SatisComponent,
    children: [{ path: '', loadChildren: () => import("../app/pages/satis/satis.module").then(m => m.SatisModule) },]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
