import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/Auth/guards/admin.guard';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { UserSelectionRoleComponent } from './user-roles/user-selection-role.component';



@NgModule({
  declarations: [
    UserComponent,
    UserRolesComponent,
    UserSelectionRoleComponent
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
    // RouterModule.forChild([
    //   {
    //     path: "user", component: UserComponent, canActivate: [AdminGuard]
    //   },

      
    // ])

    RouterModule.forChild([
      { path: 'user-roles', component: UserRolesComponent },


    ])
  ]
})
export class UserModule { }
