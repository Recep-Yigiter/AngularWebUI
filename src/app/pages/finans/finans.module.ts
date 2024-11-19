import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinansComponent } from './finans.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DividerModule } from 'primeng/divider';
import { RouterModule } from '@angular/router';
import { authGuard } from 'src/app/Auth/guards/auth.guard';



@NgModule({
  declarations: [
    FinansComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    DividerModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
          { path: 'banka', loadChildren: () => import("./banka/banka.module").then(m => m.BankaModule),canActivate:[authGuard] },
          { path: 'cari', loadChildren: () => import("./cari/cari.module").then(m => m.CariModule),canActivate:[authGuard] },
          { path: 'kasa', loadChildren: () => import("./kasa/kasa.module").then(m => m.KasaModule),canActivate:[authGuard] },
          { path: 'fatura', loadChildren: () => import("./fatura/fatura.module").then(m => m.FaturaModule),canActivate:[authGuard] },
          { path: 'irsaliye', loadChildren: () => import("./irsaliye/irsaliye.module").then(m => m.IrsaliyeModule),canActivate:[authGuard] },
        //  { path: 'mahsup', loadChildren: () => import("./mahsup/mahsup.module").then(m => m.MahsupModule),canActivate:[authGuard] },
        //  { path: 'tahsil', loadChildren: () => import("./tahsil/tahsil.module").then(m => m.TahsilModule),canActivate:[authGuard] },
        //  { path: 'tediye', loadChildren: () => import("./tediye/tediye.module").then(m => m.TediyeModule),canActivate:[authGuard] },
      
    ])
  ]
})
export class FinansModule { }
