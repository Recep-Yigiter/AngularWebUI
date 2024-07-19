import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

import { HttpErrorResponse } from '@angular/common/http';
import { BirimService } from 'src/app/core/services/repository/birim.service';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';

@Component({
  selector: 'app-list-birim',
  templateUrl: './list-birim.component.html',
  styleUrls: ['./list-birim.component.scss']
})
export class ListBirimComponent implements OnInit {


  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string; } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  constructor(
    private BirimService: BirimService,
    private router:Router,
    ) { }

  async ngOnInit() {

  }


  colDefs: ColDef[] = [
    { field: "ad" , width: 200, filter: "agTextColumnFilter",},
    { field: "kod" , width: 200, filter: "agTextColumnFilter",},

  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.BirimService.list(() => { }, errorMessage =>{console.log("Hata....",errorMessage.error)} )).items;

  }
  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
  }
  rowDblClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.router.navigate(['/menu/malzeme-yonetimi/birim/detail'],{state:selectedRows})
  }


  filterSideMenu() {
    // document.getElementById("filter_menu").style.width ="200px";
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
  }


}
