import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeklifComponent } from './teklif.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { authGuard } from 'src/app/Auth/guard/auth.guard';



@NgModule({
  declarations: [
    TeklifComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([

        { path: "teklif", component: TeklifComponent,canActivate:[authGuard]},
        {
            path: '', 
            children: [{ path: '', loadChildren: () => import("../teklif/alinan-teklif/alinan-teklif.module").then(m => m.AlinanTeklifModule) ,canActivate:[authGuard]},],canActivate:[authGuard]
        },
        {
            path: '', 
            children: [{ path: '', loadChildren: () => import("../teklif/verilen-teklif/verilen-teklif.module").then(m => m.VerilenTeklifModule) ,canActivate:[authGuard]}],canActivate:[authGuard]
        },


        

    ])
  ]
})
export class TeklifModule { }
