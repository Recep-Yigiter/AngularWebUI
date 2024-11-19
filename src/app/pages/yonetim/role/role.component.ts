import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/core/services/repository/role.service';
import { UserService } from 'src/app/core/services/repository/user.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteButtonComponent } from 'src/app/shared/components/delete-button/delete-button.component';
import { AddRoleClaimsButtonComponent } from 'src/app/shared/components/add-role-claims-button/add-role-claims-button.component';
import { Router } from '@angular/router';
import { CreateRoleComponent } from './create-role/create-role.component';
import { PermissionModalComponent } from './permission-modal/permission-modal.component';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  async ngOnInit() {

 

  }

}
