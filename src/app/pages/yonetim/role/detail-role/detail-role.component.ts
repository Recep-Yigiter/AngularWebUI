import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ApplicationService } from 'src/app/core/services/repository/application.service';
import { RoleService } from 'src/app/core/services/repository/role.service';

@Component({
  selector: 'app-detail-role',
  templateUrl: './detail-role.component.html',
  styleUrls: ['./detail-role.component.scss']
})
export class DetailRoleComponent implements OnInit {
  @Input() data: any;
  private gridApi!: GridApi<any>;
  public rowSelection: "single" | "multiple" = "single";
  rowData: any;
  constructor(private fb: FormBuilder,
     private RoleService: RoleService,
      private ApplicationService: ApplicationService,
      private router:Router,
      public activeModal: NgbActiveModal,
      private NgbModal: NgbModal
    ) {
  



  }
  ngOnInit(): void {
    this.getByRoleFull();


  }
  public frm: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(16)]],
    description: [null, [Validators.required, Validators.maxLength(16)]],
    normalizedName: [null, [Validators.required, Validators.maxLength(16)]],


  })
  get name() { return this.frm.get('name') }
  get description() { return this.frm.get('description') }
  get normalizedName() { return this.frm.get('normalizedName') }




  colDefs: ColDef[] = [
    { field: "actionName", headerName: "Action Name", width: 100, },
    { field: "actionType", headerName: "Action Type", width: 100, },
    { field: "httpType", headerName: "Http Type", width: 150 },
    { field: "claimValue", headerName: "Claim Vlue", width: 250 },

  ];


  Kaydet() {

  }

  cikis() {
    this.activeModal.close(false)
  }

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;

  }

  roleFull: any;
  listEndpoint: any;
  async getByRoleFull() {

console.log(this.data.id)
    this.roleFull = (await this.RoleService.getByRoleIdFull(this.data.id, () => { })).data.permissions;
    this.listEndpoint = await this.ApplicationService.getAllPermissions();

    this.listEndpoint.forEach(endpoint => {
      endpoint.actions.forEach(element => {
        element.actionName = endpoint.name
        if (this.roleFull.indexOf(element.claimValue) > -1 ? true : false) {
          this.gridApi.applyTransaction({ add: [element], addIndex: this.gridApi.getLastDisplayedRow() + 1 })
        }
      });
    });

  }


}
