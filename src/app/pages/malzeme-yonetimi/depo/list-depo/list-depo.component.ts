import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { DepoService } from 'src/app/core/services/repository/depo.service';
import { defaultColDef } from 'src/app/shared/default-col-def';

@Component({
  selector: 'app-list-depo',
  templateUrl: './list-depo.component.html',
  styleUrls: ['./list-depo.component.scss']
})
export class ListDepoComponent implements OnInit {


  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string; } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;

  constructor(
    private DepoService: DepoService,
    private router:Router,
    ) { }

  async ngOnInit() {

  }


  colDefs: ColDef[] = [
    { field: "kod", width: 200, filter: "agTextColumnFilter",},
    { field: "ad" , width: 200, filter: "agTextColumnFilter",},
    { field: "giren" , width: 200,},
    { field: "cikan" , width: 200, },
    { field: "mevcut" , width: 200, },


  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.DepoService.GetList(() => { })).items;
  
  }
  onSelectionChanged() {
  
    const selectedRows = this.gridApi.getSelectedRows()[0];


  }
  rowDblClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.router.navigate(['/menu/malzeme-yonetimi/depo/detail'],{state:selectedRows})
  }

  filterSideMenu() {
    // document.getElementById("filter_menu").style.width ="200px";
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
  }


}
