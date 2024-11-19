import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/core/services/repository/user.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { UserSelectionRoleComponent } from './user-selection-role.component';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {

  rowData: any;
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;

  user: any
  constructor(
    private UserService: UserService,
    public activeModal: NgbActiveModal
  ) {

  }


  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };
  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;

    this.rowData = (await this.UserService.getRolesByUserId(this.user.id, () => { })).data

  }
  permissions: any = [];
  colDefs: ColDef[] = [

    { headerName: 'Name', field: 'name', },
    { headerName: 'Description', field: 'description' },
    { headerName: 'IsAssigned', field: 'isAssigned', cellRenderer: UserSelectionRoleComponent }
  ];

  async ngOnInit() {

  }


  Kaydet() {
    let roleAssigned={
      userRoles:this.rowData
    }

     this.UserService.updateRoles(roleAssigned, this.user.id, () => {
       this.activeModal.close()
     })
  }
}
