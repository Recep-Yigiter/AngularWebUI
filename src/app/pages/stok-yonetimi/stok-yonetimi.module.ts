import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StokYonetimiComponent } from './stok-yonetimi.component';
import { RouterModule } from '@angular/router';
import { StokComponent } from './stok/stok.component';
import { BirimComponent } from './birim/birim.component';
import { DepoComponent } from './depo/depo.component';
import { HizmetComponent } from './hizmet/hizmet.component';
import { MasrafComponent } from './masraf/masraf.component';
import { DepoBazindaStokComponent } from './depo-bazinda-stok/depo-bazinda-stok.component';



@NgModule({
  declarations: [
    StokYonetimiComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {
          path: "",
          children: [
            { path: 'stok', component: StokComponent, loadChildren: () => import("../stok-yonetimi/stok/stok.module").then(m => m.StokModule) },
            { path: 'birim', component: BirimComponent, loadChildren: () => import("../stok-yonetimi/birim/birim.module").then(m => m.BirimModule) },
            { path: 'depo', component: DepoComponent, loadChildren: () => import("../stok-yonetimi/depo/depo.module").then(m => m.DepoModule) },
            { path: 'hizmet', component: HizmetComponent, loadChildren: () => import("../stok-yonetimi/hizmet/hizmet.module").then(m => m.HizmetModule) },
            { path: 'masraf', component: MasrafComponent, loadChildren: () => import("../stok-yonetimi/masraf/masraf.module").then(m => m.MasrafModule) },
            { path: 'depo-bazinda-stok', component: DepoBazindaStokComponent, loadChildren: () => import("../stok-yonetimi/depo-bazinda-stok/depo-bazinda-stok.module").then(m => m.DepoBazindaStokModule) },
          ]
        },
        
      ]),
  ]
})
export class StokYonetimiModule { }
