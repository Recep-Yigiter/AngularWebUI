import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SatisIrsaliyeComponent } from './satis-irsaliye.component';
import { CreateSatisIrsaliyeComponent } from './create-satis-irsaliye/create-satis-irsaliye.component';
import { ListSatisIrsaliyeComponent } from './list-satis-irsaliye/list-satis-irsaliye.component';
import { UpdateSatisIrsaliyeComponent } from './update-satis-irsaliye/update-satis-irsaliye.component';
import { DetailSatisIrsaliyeComponent } from './detail-satis-irsaliye/detail-satis-irsaliye.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { authGuard } from 'src/app/Auth/guards/auth.guard';
import { DesignComponent } from './core/design/design.component';



@NgModule({
  declarations: [
    SatisIrsaliyeComponent,
    ListSatisIrsaliyeComponent,
    CreateSatisIrsaliyeComponent,
    UpdateSatisIrsaliyeComponent,
    DetailSatisIrsaliyeComponent,
    DesignComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    MatIconModule,
    MatButtonModule,
    DirectiveModule,
    MatCheckboxModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      { path: "list", component: ListSatisIrsaliyeComponent, canActivate: [authGuard] },
      { path: "create", component: CreateSatisIrsaliyeComponent, canActivate: [authGuard] },
      { path: "update", component: UpdateSatisIrsaliyeComponent, canActivate: [authGuard] },
      { path: "detail", component: DetailSatisIrsaliyeComponent, canActivate: [authGuard] },

      //  {
      //    path: "satis-Irsaliyesi", component: SatisIrsaliyeComponent
      //  },

    ])
  ]
})
export class SatisIrsaliyeModule { }
