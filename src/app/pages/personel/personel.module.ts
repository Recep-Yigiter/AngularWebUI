import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonelComponent } from './personel.component';
import { RouterModule } from '@angular/router';
import { DepartmanComponent } from './departman/departman.component';



@NgModule({
  declarations: [
    PersonelComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {
          path: "",
          children: [
             { path: 'departman', component: DepartmanComponent, loadChildren: () => import("../personel/departman/departman.module").then(m => m.DepartmanModule) },
            // { path: 'birim', component: BirimComponent, loadChildren: () => import("../stok-yonetimi/birim/birim.module").then(m => m.BirimModule) },
            // { path: 'depo', component: DepoComponent, loadChildren: () => import("../stok-yonetimi/depo/depo.module").then(m => m.DepoModule) },
            // { path: 'hizmet', component: HizmetComponent, loadChildren: () => import("../stok-yonetimi/hizmet/hizmet.module").then(m => m.HizmetModule) },
            // { path: 'masraf', component: MasrafComponent, loadChildren: () => import("../stok-yonetimi/masraf/masraf.module").then(m => m.MasrafModule) },
            // { path: 'depo-bazinda-stok', component: DepoBazindaStokComponent, loadChildren: () => import("../stok-yonetimi/depo-bazinda-stok/depo-bazinda-stok.module").then(m => m.DepoBazindaStokModule) },
          ]
        },
        
      ]),
  ]
})
export class PersonelModule { }
