import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AgGridAngular } from 'ag-grid-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';

import { authGuard } from '../Auth/auth.guard';

@NgModule({
  declarations: [
    PagesComponent,
    


  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    AgGridAngular,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild(
      [
        {
          path: '',
          children: [
            { path: 'yonetim', loadChildren: () => import("../pages/Auth/administration/administration.module").then(m => m.AdministrationModule),  },
            { path: 'stok', loadChildren: () => import("../pages/stok/stok.module").then(m => m.StokModule), canActivate: [authGuard] },
            { path: 'depo', loadChildren: () => import("../pages/depo/depo.module").then(m => m.DepoModule), canActivate: [authGuard] },
            { path: 'hizmet', loadChildren: () => import("../pages/hizmet/hizmet.module").then(m => m.HizmetModule), canActivate: [authGuard] },
            { path: 'masraf', loadChildren: () => import("../pages/masraf/masraf.module").then(m => m.MasrafModule), canActivate: [authGuard] },
            { path: 'birim', loadChildren: () => import("../pages/birim/birim.module").then(m => m.BirimModule), canActivate: [authGuard] },
            { path: 'fatura', loadChildren: () => import("../pages/fatura/alis-fatura/alis-fatura.module").then(m => m.AlisFaturaModule), canActivate: [authGuard] },
            { path: 'fatura', loadChildren: () => import("../pages/fatura/satis-fatura/satis-fatura.module").then(m => m.SatisFaturaModule), canActivate: [authGuard] },


            { path: 'fatura', loadChildren: () => import("../pages/fatura/fatura.module").then(m => m.FaturaModule), canActivate: [authGuard] },
            { path: 'urun-recete', loadChildren: () => import("../pages/uretim/urun-recete/urun-recete.module").then(m => m.UrunReceteModule), canActivate: [authGuard] },
            { path: 'urun-agaci', loadChildren: () => import("../pages/uretim/urun-agaci/urun-agaci.module").then(m => m.UrunAgaciModule), canActivate: [authGuard] },
            { path: 'is-merkezi', loadChildren: () => import("../pages/uretim/is-merkezi/is-merkezi.module").then(m => m.IsMerkeziModule), canActivate: [authGuard] },
            { path: 'uretim-emri', loadChildren: () => import("../pages/uretim/uretim-emri/uretim-emri.module").then(m => m.UretimEmriModule), canActivate: [authGuard] },
            { path: 'uretim-maliyet-analizi', loadChildren: () => import("../pages/uretim/uretim-maliyet-analizi/uretim-maliyet-analizi.module").then(m => m.UretimMaliyetAnaliziModule), canActivate: [authGuard] },




            { path: 'teklif', loadChildren: () => import("../pages/teklif/alinan-teklif/alinan-teklif.module").then(m => m.AlinanTeklifModule), canActivate: [authGuard] },
            { path: 'teklif', loadChildren: () => import("../pages/teklif/verilen-teklif/verilen-teklif.module").then(m => m.VerilenTeklifModule), canActivate: [authGuard] },

            { path: 'siparis', loadChildren: () => import("../pages/siparis/alinan-siparis/alinan-siparis.module").then(m => m.AlinanSiparisModule), canActivate: [authGuard] },
            { path: 'siparis', loadChildren: () => import("../pages/siparis/verilen-siparis/verilen-siparis.module").then(m => m.VerilenSiparisModule), canActivate: [authGuard] },
           

          ], canActivate: [authGuard]
        },

      ]),

  ]


})
export class PageModule { }
