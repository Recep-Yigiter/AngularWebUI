import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { MasrafService } from 'src/app/core/services/repository/masraf.service';
@Component({
  selector: 'app-masraf',
  templateUrl: './masraf.component.html',
  styleUrls: ['./masraf.component.scss']
})
export class MasrafComponent {


  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;


  constructor(
    private MasrafService: MasrafService,
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
    this.rowData = (await this.MasrafService.GetList(() => { })).items;
  }
  onSelectionChanged() {
  
    const selectedRows = this.gridApi.getSelectedRows()[0];

    this.router.navigate(['/masraf/detail'],{state:selectedRows})
  }

  filterSideMenu() {
    // document.getElementById("filter_menu").style.width ="200px";
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
  }


}
