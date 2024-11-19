import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

import { HttpErrorResponse } from '@angular/common/http';
import { BirimService } from 'src/app/core/services/repository/birim.service';
import { RoleService } from 'src/app/core/services/repository/role.service';
import { ApplicationService } from 'src/app/core/services/repository/application.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OnayDurumSelectComponent } from 'src/app/shared/components/onay-durum-select/onay-durum-select.component';
import { ViewPermissionCheckboxComponent } from './components/view-permission-checkbox.component';
import { CreatePermissionCheckboxComponent } from './components/create-permission-checkbox.component';
import { UpdatePermissionCheckboxComponent } from './components/update-permission-checkbox.component';
import { DeletePermissionCheckboxComponent } from './components/delete-permission-checkbox.component';

@Component({
  selector: 'app-permission-modal',
  templateUrl: './permission-modal.component.html',
  styleUrls: ['./permission-modal.component.scss']
})
export class PermissionModalComponent implements OnInit {

  RoleId: any;
  rowData: any[] = [];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;


  constructor(
    private ApplicationService: ApplicationService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private RoleService: RoleService
  ) { }

  roleFull: any;
  listEndpoint: any;

  async ngOnInit() {
    const rows = []
    this.roleFull = (await this.RoleService.getByRoleIdFull(this.RoleId, () => { })).data.permissions;

    this.listEndpoint = await this.ApplicationService.getAllPermissions();
    this.listEndpoint.forEach(endpoint => {
      endpoint.actions.forEach(data => {
        data.actionName = endpoint.name

        let deneme = {
          name: endpoint.name,
          create: { checked: this.roleFull.indexOf("Permission" + "." + endpoint.name + "." + "Create") > -1 ? true : false, claimValue: "Permission" + "." + endpoint.name + "." + "Create" },
          update: { checked: this.roleFull.indexOf("Permission" + "." + endpoint.name + "." + "Update") > -1 ? true : false, claimValue: "Permission" + "." + endpoint.name + "." + "Update" },
          delete: { checked: this.roleFull.indexOf("Permission" + "." + endpoint.name + "." + "Delete") > -1 ? true : false, claimValue: "Permission" + "." + endpoint.name + "." + "Delete" },
          view: { checked: this.roleFull.indexOf("Permission" + "." + endpoint.name + "." + "View") > -1 ? true : false, claimValue: "Permission" + "." + endpoint.name + "." + "View" },
        }

        if (rows.map(c => c.name).indexOf(deneme.name) > -1 == false) {
          rows.push(deneme)
        }


      });

    });
    this.rowData = rows;


  }





  filterSideMenu() {
    // document.getElementById("filter_menu").style.width ="200px";
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
  }





















  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };
  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;

  }
  permissions: any = [];
  colDefs: ColDef[] = [
    { headerName: '', field: 'name' },
    { headerName: 'Create', field: 'create.checked', cellRenderer: CreatePermissionCheckboxComponent },
    { headerName: 'Update', field: 'update.checked', cellRenderer: UpdatePermissionCheckboxComponent },
    { headerName: 'Delete', field: 'delete.checked', cellRenderer: DeletePermissionCheckboxComponent },
    { headerName: 'View', field: 'view.checked', cellRenderer: ViewPermissionCheckboxComponent }
  ];







  Kaydet() {
    this.permissions = []
    this.rowData.forEach((item) => {
      if (item.create.checked) {
        this.permissions.push(item.create.claimValue)
      }
      if (item.update.checked) {
        this.permissions.push(item.update.claimValue)
      }
      if (item.delete.checked) {
        this.permissions.push(item.delete.claimValue)
      }
      if (item.view.checked) {
        this.permissions.push(item.view.claimValue)
      }

    })

    let deneme = {
      roleId: this.RoleId,
      permissions: this.permissions
    }


    this.RoleService.updatePermissions(deneme, () => {
      this.activeModal.close()
     })

  }

}
