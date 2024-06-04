import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { HizmetService } from 'src/app/core/services/repository/hizmet.service';
@Component({
  selector: 'app-hizmet',
  templateUrl: './hizmet.component.html',
  styleUrls: ['./hizmet.component.scss']
})
export class HizmetComponent {


  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;


  constructor(
    private HizmetService: HizmetService,
    private router:Router,
    ) { }

  ngOnInit(): void {

  }


  colDefs: ColDef[] = [
    { field: "kod" },
    { field: "ad" },


  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.HizmetService.GetList(() => { })).items;
  }
  onSelectionChanged() {
  
    const selectedRows = this.gridApi.getSelectedRows()[0];

    this.router.navigate(['/hizmet/detail'],{state:selectedRows})
  }

  filterSideMenu() {
    // document.getElementById("filter_menu").style.width ="200px";
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
  }


}
