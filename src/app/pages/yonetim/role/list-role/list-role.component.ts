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
import { UpdateRoleComponent } from '../update-role/update-role.component';
import { DeleteModalComponents } from 'src/app/shared/utilities/confirms/delete-modal';
import { DetailRoleComponent } from '../detail-role/detail-role.component';


@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss'],
})
export class ListRoleComponent implements OnInit {
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  frameworkComponents: any;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;

  rowData: any[];
  buttonDisabled: boolean = true;
  selectedRow: any;
  constructor(
    private RoleService: RoleService,
    private NgbModal: NgbModal,
    private router: Router
  ) {
    this.frameworkComponents = {
      buttonRenderer: AddRoleClaimsButtonComponent,
    };
  }

  colDefs: ColDef[] = [
    { field: 'name' },
    {
      field: 'normalizedName',
    },

  ];
  roles: any;
  async ngOnInit() {
    this.getRoles();
  }
  roleSelected: any;
  addRoleClaim(event) {console.log("first")
    this.roleSelected = event.rowData;

    this.listPermissionToRole();
  }

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
  }

  selectedRows: any;
  rowDoubleClick() {
    this.selectedRow = this.gridApi.getSelectedRows()[0];

    this.updateModal()
    // this.router.navigate(['/administration/role/detail'], {
    //   state: selectedRows,
    // });
    
  }
  async getRoles() {
    this.roles = (await this.RoleService.list()).data;
  }

  rowClick() {
    this.selectedRow = this.gridApi.getSelectedRows()[0];
    this.buttonDisabled = false;
  }


  listPermissionToRole() {
    console.log(this.selectedRow)
    const modalRef = this.NgbModal.open(PermissionModalComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.confirmationBoxTitle = 'Rol Ekle';
    modalRef.componentInstance.RoleId = this.selectedRow.id;
    modalRef.result.then((condition) => {
      if (condition) {
        this.getRoles();
      }
    });
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
  }

  createModal() {
    const modalRef = this.NgbModal.open(CreateRoleComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Role Kartı';

    modalRef.result.then(async (item) => {
      if (item) {
        this.refresh();
      }
    });
  }

  updateModal() {
    if (this.selectedRow) {
      const modalRef = this.NgbModal.open(UpdateRoleComponent, {
        size: 'md',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = this.selectedRow;

      modalRef.result.then(async (item) => {
        if (item == true) {
          this.refresh();
        }
      });
    }
  }

  detailModal(){
    if (this.selectedRow) {
     
      const modalRef = this.NgbModal.open(DetailRoleComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = this.selectedRow;

      modalRef.result.then(async (item) => {
        if (item == true) {
          this.refresh();
        }
      });
    }
  }

  async refresh() {
   this.getRoles()
  }

  delete() {
    if (this.selectedRow) {
      const modalRef = this.NgbModal.open(DeleteModalComponents, {
        size: 'sm',
        backdrop: 'static',
      });
      modalRef.result.then((event) => {
        if (event == true) {
          this.RoleService.delete(this.selectedRow.id, () => {
            this.refresh();
          });
        }
      });
    }
  }
  filter: boolean = false;
  filtrele() {
    this.filter = !this.filter;
  }
}
