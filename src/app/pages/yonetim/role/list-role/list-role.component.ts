import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/core/services/repository/role.service';
import { UserService } from 'src/app/core/services/repository/user.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteButtonComponent } from 'src/app/shared/components/delete-button/delete-button.component';
import { AddRoleClaimsButtonComponent } from 'src/app/shared/components/add-role-claims-button/add-role-claims-button.component';
import { Router } from '@angular/router';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { CreateRoleComponent } from '../create-role/create-role.component';
import { PermissionModalComponent } from '../permission-modal/permission-modal.component';


@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss']
})
export class ListRoleComponent implements OnInit {


  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  frameworkComponents: any
  public localeText: { [key: string]: string; } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  constructor(private RoleService: RoleService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.frameworkComponents = {
      buttonRenderer: AddRoleClaimsButtonComponent,
    }

  }

  colDefs: ColDef[] = [
    { field: "name" },
    {
      field: "normalizedName"

    },
    {
      width: 90,
      cellRenderer: 'buttonRenderer',
      cellRendererParams: { onClick: this.addRoleClaim.bind(this) }
    }

  ];
  roles: any;
  async ngOnInit() {

    this.getRoles()

  }
  roleSelected: any
  addRoleClaim(event) {
    this.roleSelected = event.rowData;
    
    this.listPermissionToRole()

  }

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
  }

  selectedRows:any;
  rowDoubleClick() {

    const selectedRows = this.gridApi.getSelectedRows()[0];

    this.router.navigate(['/administration/role/detail'], { state: selectedRows })

  }
  async getRoles() {
    this.roles = (await this.RoleService.list()).data
  }








  createRole() {
    const modalRef = this.modalService.open(CreateRoleComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.confirmationBoxTitle = 'Rol Ekle';
    modalRef.result.then(() => {
      this.getRoles();

    });

  }
  listPermissionToRole() {
    const modalRef = this.modalService.open(PermissionModalComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.confirmationBoxTitle = 'Rol Ekle';
    modalRef.componentInstance.RoleId = this.roleSelected.id;
    modalRef.result.then(() => {
      this.getRoles();

    });

  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
  }


  // updatePermissionsModal() {
  //   const modalRef = this.modalService.open(UpdatePermissionsModalComponent, { size: 'xl', backdrop: 'static' });
  //   modalRef.componentInstance.role =this.roleSelected;
  //   modalRef.result.then(() => {


  //   });

  // }



}
