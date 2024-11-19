import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/Auth/guards/admin.guard';
import { CreateRoleComponent } from './create-role/create-role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';
import { DetailRoleComponent } from './detail-role/detail-role.component';
import { PermissionModalComponent } from './permission-modal/permission-modal.component';
import {CheckboxModule} from 'primeng/checkbox';
import { CreatePermissionCheckboxComponent } from './permission-modal/components/create-permission-checkbox.component';
import { UpdatePermissionCheckboxComponent } from './permission-modal/components/update-permission-checkbox.component';
import { DeletePermissionCheckboxComponent } from './permission-modal/components/delete-permission-checkbox.component';
import { ViewPermissionCheckboxComponent } from './permission-modal/components/view-permission-checkbox.component';


@NgModule({
  declarations: [
    RoleComponent,
    CreateRoleComponent,
    UpdateRoleComponent,
    DetailRoleComponent,

    PermissionModalComponent,
    CreatePermissionCheckboxComponent,
    UpdatePermissionCheckboxComponent,
    DeletePermissionCheckboxComponent,
    ViewPermissionCheckboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    ButtonModule,
    MatListModule,
    MatCheckboxModule,
    CheckboxModule,
    TableModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      {
        path: "role", component: RoleComponent, canActivate: [AdminGuard]
      },
      {
        path: "role", canActivate: [AdminGuard],children:[
         
          {path:"detail",component: DetailRoleComponent,canActivate:[AdminGuard]},

        ]
      },
      
    ])
  ]
})
export class RoleModule { }
