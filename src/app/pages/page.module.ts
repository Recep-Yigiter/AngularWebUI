import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AgGridAngular } from 'ag-grid-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authGuard } from '../Auth/guards/auth.guard';
import { IsGrantedDirective } from '../Auth/is-granted.directive';
import { AdminGuard } from '../Auth/guards/admin.guard';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { ListboxModule } from 'primeng/listbox';
import { DividerModule } from 'primeng/divider';


import { CheckboxModule } from 'primeng/checkbox';
import { MalzemeYonetimiComponent } from './malzeme-yonetimi/malzeme-yonetimi.component';
import { SatinalmaComponent } from './satinalma/satinalma.component';
import { SatisComponent } from './satis/satis.component';
import { FaturaComponent } from './fatura/fatura.component';
import { IrsaliyeComponent } from './irsaliye/irsaliye.component';
import { FinansComponent } from './finans/finans.component';

import { AngularSplitModule } from 'angular-split';
import { UretimComponent } from './uretim/uretim.component';
import {AvatarModule} from 'primeng/avatar';
@NgModule({
  declarations: [
    PagesComponent,
    IsGrantedDirective,


  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    AgGridAngular,
    MatButtonModule,
    MatCheckboxModule,
    CheckboxModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    DropdownModule,
    AccordionModule,
    ListboxModule,
    FormsModule,
    DividerModule,
    AngularSplitModule,
    AvatarModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild(
      [
        {
          path: '',
          children: [
            // { path: 'urun-recete', loadChildren: () => import("../pages/uretim/urun-recete/urun-recete.module").then(m => m.UrunReceteModule), canActivate: [authGuard] },
            // { path: 'urun-agaci', loadChildren: () => import("../pages/uretim/urun-agaci/urun-agaci.module").then(m => m.UrunAgaciModule), canActivate: [authGuard] },
            // { path: 'is-merkezi', loadChildren: () => import("../pages/uretim/is-merkezi/is-merkezi.module").then(m => m.IsMerkeziModule), canActivate: [authGuard] },
            // { path: 'uretim-emri', loadChildren: () => import("../pages/uretim/uretim-emri/uretim-emri.module").then(m => m.UretimEmriModule), canActivate: [authGuard] },
            // { path: 'uretim-maliyet-analizi', loadChildren: () => import("../pages/uretim/uretim-maliyet-analizi/uretim-maliyet-analizi.module").then(m => m.UretimMaliyetAnaliziModule), canActivate: [authGuard] },
            // { path: 'finans', loadChildren: () => import("../pages/finans/finans.module").then(m => m.FinansModule), canActivate: [authGuard] },
            { path: 'administration', loadChildren: () => import("../pages/administration/administration.module").then(m => m.AdministrationModule), },
          ], canActivate: [AdminGuard]
        },



        {
          path: "menu",
          children: [
            { path: 'malzeme-yonetimi', component: MalzemeYonetimiComponent, loadChildren: () => import("../pages/malzeme-yonetimi/malzeme-yonetimi.module").then(m => m.MalzemeYonetimiModule), canActivate: [authGuard] },
            { path: 'satinalma', component: SatinalmaComponent, loadChildren: () => import("../pages/satinalma/satinalma.module").then(m => m.SatinalmaModule), canActivate: [authGuard] },
            { path: 'satis', component: SatisComponent, loadChildren: () => import("../pages/satis/satis.module").then(m => m.SatisModule), canActivate: [authGuard] },
            { path: 'fatura',component:FaturaComponent, loadChildren: () => import("../pages/fatura/fatura.module").then(m => m.FaturaModule), canActivate: [authGuard] },
            { path: 'irsaliye',component:IrsaliyeComponent, loadChildren: () => import("../pages/irsaliye/irsaliye.module").then(m => m.IrsaliyeModule), canActivate: [authGuard] },
            { path: 'finans',component:FinansComponent, loadChildren: () => import("../pages/finans/finans.module").then(m => m.FinansModule), canActivate: [authGuard] },
            { path: 'uretim',component:UretimComponent, loadChildren: () => import("../pages/uretim/uretim.module").then(m => m.UretimModule), canActivate: [authGuard] },
          ]
        },





      ]),

  ]

})
export class PageModule { }
