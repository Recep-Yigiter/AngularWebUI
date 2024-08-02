import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
import * as resize from '../../../../../assets/js/resizable-layout.js';
import { BankaService } from 'src/app/core/services/repository/banka.service';

@Component({
  selector: 'app-list-banka',
  templateUrl: './list-banka.component.html',
  styleUrls: ['./list-banka.component.scss']
})
export class ListBankaComponent implements OnInit {


  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string; } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  constructor(
    private BankaService: BankaService,
    private router:Router,
    ) { }

  async ngOnInit() {
    resize.resizeFunction()
  }


  colDefs: ColDef[] = [
    { field: "kod" ,headerName:"Kod", width: 200, filter: "agTextColumnFilter",},
    { field: "ad" ,headerName:"Ad", width: 600, filter: "agTextColumnFilter",},
  
  ];
  CurrencyCellRendererTR(params: any) {
    var inrFormat = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    });
    return inrFormat.format(params.value);
  }
  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.BankaService.GetList(() => { }, errorMessage =>{console.log("Hata....",errorMessage.error)} )).items;

  }
  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
  }
  rowDblClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.router.navigate(['/menu/finans/banka/detail'],{state:selectedRows})
  }


  filterSideMenu() {
    // document.getElementById("filter_menu").style.width ="200px";
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
  }


}
