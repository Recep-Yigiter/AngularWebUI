import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/Auth/guards/admin.guard';
import { CreateRoleModalComponent } from './create-role-modal/create-role-modal.component';
import { UpdatePermissionsModalComponent } from './update-permissions-modal/update-permissions-modal.component';
import {MatTreeModule} from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { UpdateRoleComponent } from './update-role/update-role.component';


@NgModule({
  declarations: [
    RoleComponent,
    CreateRoleModalComponent,
    UpdatePermissionsModalComponent,
    UpdateRoleComponent
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
    TableModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forChild([
      {
        path: "role", component: RoleComponent, canActivate: [AdminGuard]
      },
      
      {
        path: "role",  canActivate: [AdminGuard],children:[{path:"update",component: UpdateRoleComponent,}]
      },
      
    ])
  ]
})
export class RoleModule { }
