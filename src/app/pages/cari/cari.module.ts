import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CariComponent } from './cari.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { authGuard } from 'src/app/Auth/guards/auth.guard';



@NgModule({
  declarations: [
    CariComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule,
    AgGridAngular,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    ButtonModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      {
        path: "cari", component: CariComponent,canActivate:[authGuard],

      },
      // {
      //   path: "verilen-teklif", component: VerilenTeklifComponent,canActivate:[authGuard],
      //   children: [
      //     { path: "create", component: CreateVerilenTeklifComponent,canActivate:[authGuard]},
      //     { path: "update", component: UpdateVerilenTeklifComponent,canActivate:[authGuard]},
      //     { path: "detail", component: DetailVerilenTeklifComponent,canActivate:[authGuard]},
      //   ]
      // }

    ])
  ]
})
export class CariModule { }
