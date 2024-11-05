import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UretimComponent } from './uretim.component';
import { DividerModule } from 'primeng/divider';
import { RouterModule } from '@angular/router';
import { IsMerkeziComponent } from './is-merkezi/is-merkezi.component';
import { UretimEmriComponent } from './uretim-emri/uretim-emri.component';
import { UrunAgaciComponent } from './urun-agaci/urun-agaci.component';
import { UrunReceteComponent } from './urun-recete/urun-recete.component';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { UrunReceteHareketComponent } from './urun-recete-hareket/urun-recete-hareket.component';



@NgModule({
  declarations: [
    UretimComponent
  ],
  imports: [
    CommonModule,
    DividerModule,
    RouterModule.forChild([

      { path: 'is-merkezi', component:IsMerkeziComponent, loadChildren: () => import("../uretim/is-merkezi/is-merkezi.module").then(m => m.IsMerkeziModule) ,canActivate:[authGuard]},
      { path: 'uretim-emri', component:UretimEmriComponent, loadChildren: () => import("../uretim/uretim-emri/uretim-emri.module").then(m => m.UretimEmriModule) ,canActivate:[authGuard]},
      { path: 'urun-agaci', component:UrunAgaciComponent, loadChildren: () => import("../uretim/urun-agaci/urun-agaci.module").then(m => m.UrunAgaciModule) ,canActivate:[authGuard]},
      { path: 'urun-recete', component:UrunReceteComponent, loadChildren: () => import("../uretim/urun-recete/urun-recete.module").then(m => m.UrunReceteModule) ,canActivate:[authGuard]},
      { path: 'urun-recete-hareket', component:UrunReceteHareketComponent, loadChildren: () => import("../uretim/urun-recete-hareket/urun-recete-hareket.module").then(m => m.UrunReceteHareketModule) ,canActivate:[authGuard]},

    ])
  ]
})
export class UretimModule { }
