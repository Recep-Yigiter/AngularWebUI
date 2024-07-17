import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MalzemeYonetimiComponent } from './malzeme-yonetimi.component';
import { RouterModule } from '@angular/router';
import { BirimComponent } from './birim/birim.component';
import { DepoComponent } from './depo/depo.component';
import { HizmetComponent } from './hizmet/hizmet.component';
import { MasrafComponent } from './masraf/masraf.component';
import { StokComponent } from './stok/stok.component';
import { authGuard } from 'src/app/Auth/guards/auth.guard';



@NgModule({
  declarations: [
    MalzemeYonetimiComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'birim', component:BirimComponent, loadChildren: () => import("../malzeme-yonetimi/birim/birim.module").then(m => m.BirimModule) ,canActivate:[authGuard]},
      { path: 'depo', component:DepoComponent, loadChildren: () => import("../malzeme-yonetimi/depo/depo.module").then(m => m.DepoModule) ,canActivate:[authGuard]},
      { path: 'hizmet', component:HizmetComponent, loadChildren: () => import("../malzeme-yonetimi/hizmet/hizmet.module").then(m => m.HizmetModule) ,canActivate:[authGuard]},
      { path: 'masraf', component:MasrafComponent, loadChildren: () => import("../malzeme-yonetimi/masraf/masraf.module").then(m => m.MasrafModule) ,canActivate:[authGuard]},
      { path: 'stok', component:StokComponent, loadChildren: () => import("../malzeme-yonetimi/stok/stok.module").then(m => m.StokModule) ,canActivate:[authGuard]},

      
  ])
  ]
})
export class MalzemeYonetimiModule { }
