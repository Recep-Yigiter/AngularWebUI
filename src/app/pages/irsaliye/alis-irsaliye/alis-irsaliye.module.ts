import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlisIrsaliyeComponent } from './alis-irsaliye.component';
import { CreateAlisIrsaliyeComponent } from './create-alis-irsaliye/create-alis-irsaliye.component';
import { UpdateAlisIrsaliyeComponent } from './update-alis-irsaliye/update-alis-irsaliye.component';
import { DetailAlisIrsaliyeComponent } from './detail-alis-irsaliye/detail-alis-irsaliye.component';
import { ListAlisIrsaliyeComponent } from './list-alis-irsaliye/list-alis-irsaliye.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { NumberInputDirective } from 'src/app/shared/directives/number-input.directive';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';
import { authGuard } from 'src/app/Auth/auth.guard';

@NgModule({
  declarations: [
    AlisIrsaliyeComponent,
    CreateAlisIrsaliyeComponent,
    UpdateAlisIrsaliyeComponent,
    DetailAlisIrsaliyeComponent,
    ListAlisIrsaliyeComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    DirectiveModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      {
        path: "alis-irsaliyesi", component: ListAlisIrsaliyeComponent,canActivate:[authGuard]
    
      },
      {
        path: "alis-irsaliyesi", component: AlisIrsaliyeComponent,canActivate:[authGuard],
        children: [
          { path: "create", component: CreateAlisIrsaliyeComponent ,canActivate:[authGuard]},
          { path: "update", component: UpdateAlisIrsaliyeComponent ,canActivate:[authGuard]},
          { path: "detail", component: DetailAlisIrsaliyeComponent ,canActivate:[authGuard]},
        ]
      },

      //  {
      //    path: "Alis-Irsaliyesi", component: AlisIrsaliyeComponent
      //  },

    ])
  ]
})
export class AlisIrsaliyeModule { }
