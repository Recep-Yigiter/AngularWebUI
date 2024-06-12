import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { AdminGuard } from 'src/app/Auth/guards/admin.guard';
import { BrowserModule } from '@angular/platform-browser';




@NgModule({
  declarations: [AdministrationComponent],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    RouterModule.forChild([
      { path: "yonetim", component: AdministrationComponent, canActivate: [AdminGuard] },
      {
        path: '',
        children: [{ path: '', loadChildren: () => import("../administration/employee/employee.module").then(m => m.EmployeeModule), canActivate: [AdminGuard] },], canActivate: [AdminGuard]
      },
      {
        path: '',
        children: [{ path: '', loadChildren: () => import("../administration/role/role.module").then(m => m.RoleModule), canActivate: [AdminGuard] },], canActivate: [AdminGuard]
      },


    ])
  ]
})
export class AdministrationModule { }
