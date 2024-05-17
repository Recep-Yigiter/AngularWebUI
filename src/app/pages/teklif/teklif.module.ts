import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeklifComponent } from './teklif.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';



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

        { path: "teklif", component: TeklifComponent, },
        {
            path: '', 
            children: [{ path: '', loadChildren: () => import("../teklif/alinan-teklif/alinan-teklif.module").then(m => m.AlinanTeklifModule) },]
        },
        {
            path: '', 
            children: [{ path: '', loadChildren: () => import("../teklif/verilen-teklif/verilen-teklif.module").then(m => m.VerilenTeklifModule) },]
        },


        

    ])
  ]
})
export class TeklifModule { }
