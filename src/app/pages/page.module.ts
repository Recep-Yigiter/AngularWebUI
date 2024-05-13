import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FinansComponent } from './finans/finans.component';
import { FaturaComponent } from './fatura/fatura.component';
import { AgGridAngular } from 'ag-grid-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyInputDirective } from '../shared/directives/currency-input.directive';
import { NumberInputDirective } from '../shared/directives/number-input.directive';

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
       {path: 'pages', component: PagesComponent, children:[
         { path: 'stok', loadChildren: () => import("../pages/stok/stok/stok.module").then(m => m.StokModule) },
         { path: 'depo', loadChildren: () => import("../pages/stok/depo/depo.module").then(m => m.DepoModule) },
         { path: 'hizmet', loadChildren: () => import("../pages/stok/hizmet/hizmet.module").then(m => m.HizmetModule) },
         { path: 'masraf', loadChildren: () => import("../pages/stok/masraf/masraf.module").then(m => m.MasrafModule) },
         { path: 'birim', loadChildren: () => import("../pages/stok/birim/birim.module").then(m => m.BirimModule) },
         { path: 'mal-alis', loadChildren: () => import("../pages/stok/giriş/mal-alis/mal-alis.module").then(m => m.MalAlisModule) },
         { path: 'fatura', loadChildren: () => import("../pages/fatura/alis-fatura/alis-fatura.module").then(m => m.AlisFaturaModule) },
         { path: 'fatura', loadChildren: () => import("../pages/fatura/satis-fatura/satis-fatura.module").then(m => m.SatisFaturaModule) },
         { path: 'fatura', loadChildren: () => import("../pages/fatura/fatura.module").then(m => m.FaturaModule) },
         { path: 'urun-recete', loadChildren: () => import("../pages/uretim/urun-recete/urun-recete.module").then(m => m.UrunReceteModule) },
         { path: 'urun-agaci', loadChildren: () => import("../pages/uretim/urun-agaci/urun-agaci.module").then(m => m.UrunAgaciModule) },
         { path: 'is-merkezi', loadChildren: () => import("../pages/uretim/is-merkezi/is-merkezi.module").then(m => m.IsMerkeziModule) },
         { path: 'uretim-emri', loadChildren: () => import("../pages/uretim/uretim-emri/uretim-emri.module").then(m => m.UretimEmriModule) },
         { path: 'uretim-maliyet-analizi', loadChildren: () => import("../pages/uretim/uretim-maliyet-analizi/uretim-maliyet-analizi.module").then(m => m.UretimMaliyetAnaliziModule) },




         { path: 'teklif', loadChildren: () => import("../pages/teklif/alinan-teklif/alinan-teklif.module").then(m => m.AlinanTeklifModule) },
         { path: 'teklif', loadChildren: () => import("../pages/teklif/verilen-teklif/verilen-teklif.module").then(m => m.VerilenTeklifModule) },
         
         { path: 'siparis', loadChildren: () => import("../pages/siparis/alinan-siparis/alinan-siparis.module").then(m => m.AlinanSiparisModule) },
         { path: 'siparis', loadChildren: () => import("../pages/siparis/verilen-siparis/verilen-siparis.module").then(m => m.VerilenSiparisModule) },










        ]},
    
     ])
  ],


})
export class PageModule { }
