import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IrsaliyeComponent } from './irsaliye.component';
import { AgGridAngular } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { authGuard } from 'src/app/Auth/auth.guard';



@NgModule({
  declarations: [
    IrsaliyeComponent
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

            { path: "irsaliye", component: IrsaliyeComponent,canActivate:[authGuard]},
            {
                path: '',
                children: [{ path: '', loadChildren: () => import("../irsaliye/alis-irsaliye/alis-irsaliye.module").then(m => m.AlisIrsaliyeModule), canActivate:[authGuard]}],canActivate:[authGuard]
            },
            {
                path: '', 
                children: [{ path: '', loadChildren: () => import("../irsaliye/satis-irsaliye/satis-irsaliye.module").then(m => m.SatisIrsaliyeModule),canActivate:[authGuard]},],canActivate:[authGuard]
            },
        ])
  ]
})
export class IrsaliyeModule { }
