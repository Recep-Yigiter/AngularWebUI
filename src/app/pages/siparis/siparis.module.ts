import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiparisComponent } from './siparis.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SiparisComponent
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

        { path: "siparis", component: SiparisComponent, },
        {
            path: '', 
            children: [{ path: '', loadChildren: () => import("../siparis/alinan-siparis/alinan-siparis.module").then(m => m.AlinanSiparisModule) },]
        },
        {
            path: '', 
            children: [{ path: '', loadChildren: () => import("../siparis/verilen-siparis/verilen-siparis.module").then(m => m.VerilenSiparisModule) },]
        },
    ])
  ]
})
export class SiparisModule { }
