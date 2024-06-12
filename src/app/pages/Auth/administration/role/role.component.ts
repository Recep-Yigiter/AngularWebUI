import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/core/services/repository/role.service';
import { UserService } from 'src/app/core/services/repository/user.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateRoleModalComponent } from './create-role-modal/create-role-modal.component';
import { DeleteButtonComponent } from 'src/app/shared/components/delete-button/delete-button.component';
import { AddRoleClaimsButtonComponent } from 'src/app/shared/components/add-role-claims-button/add-role-claims-button.component';
import { UpdatePermissionsModalComponent } from './update-permissions-modal/update-permissions-modal.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {


  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  frameworkComponents: any
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


  }

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
  }


  rowDoubleClick() {

    const selectedRows = this.gridApi.getSelectedRows()[0];

    this.router.navigate(['/yonetim/role/update'], { state: selectedRows })

  }
  async getRoles() {
    this.roles = (await this.RoleService.list()).data
  }








  createRoleModal() {
    const modalRef = this.modalService.open(CreateRoleModalComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.confirmationBoxTitle = 'Rol Ekle';
    modalRef.result.then(() => {
      this.getRoles();

    });

  }


  // updatePermissionsModal() {
  //   const modalRef = this.modalService.open(UpdatePermissionsModalComponent, { size: 'xl', backdrop: 'static' });
  //   modalRef.componentInstance.role =this.roleSelected;
  //   modalRef.result.then(() => {


  //   });

  // }



}
