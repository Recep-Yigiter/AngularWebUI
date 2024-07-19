import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { HizmetService } from 'src/app/core/services/repository/hizmet.service';
import { defaultColDef } from 'src/app/shared/default-col-def';
@Component({
  selector: 'app-list-hizmet',
  templateUrl: './list-hizmet.component.html',
  styleUrls: ['./list-hizmet.component.scss']
})
export class ListHizmetComponent {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string; } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;

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

    
  }
  rowDblClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.router.navigate(['/menu/malzeme-yonetimi/hizmet/detail'],{state:selectedRows})
  }

  filterSideMenu() {
    // document.getElementById("filter_menu").style.width ="200px";
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
  }


}
