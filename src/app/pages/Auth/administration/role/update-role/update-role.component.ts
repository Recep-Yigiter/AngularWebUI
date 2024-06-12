import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ApplicationService } from 'src/app/core/services/repository/application.service';
import { RoleService } from 'src/app/core/services/repository/role.service';
@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {

  stateData: any;
  private gridApi!: GridApi<any>;
  public rowSelection: "single" | "multiple" = "single";
  rowData: any;
  constructor(private fb: FormBuilder,
     private RoleService: RoleService,
      private ApplicationService: ApplicationService,
      private router:Router
    ) {
    this.stateData = history.state;
    this.getByRoleFull();

  }
  ngOnInit(): void {



  }
  public frm: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(16)]],
    description: [null, [Validators.required, Validators.maxLength(16)]],
    normalizedName: [null, [Validators.required, Validators.maxLength(16)]],


  })
  get faturaTuru() { return this.frm.get('faturaTuru') }
  get seri() { return this.frm.get('seri') }
  get belgeNo() { return this.frm.get('belgeNo') }




  colDefs: ColDef[] = [
    { field: "actionName", headerName: "Action Name", width: 100, },
    { field: "actionType", headerName: "Action Type", width: 100, },
    { field: "httpType", headerName: "Http Type", width: 150 },
    { field: "claimValue", headerName: "Claim Vlue", width: 250 },

  ];


  kaydet() {

  }
  vazgec() {
    this.router.navigate(['/yonetim/role'])
  }


  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;

  }

  roleFull: any;
  listEndpoint: any;
  async getByRoleFull() {
    this.roleFull = (await this.RoleService.getByRoleIdFull(this.stateData.id, () => { })).data.permissions;
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
