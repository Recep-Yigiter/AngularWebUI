import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { StokService } from '../core/services/stok.service';

@Component({
  selector: 'app-list-stok',
  templateUrl: './list-stok.component.html',
  styleUrls: ['./list-stok.component.scss']
})
export class ListStokComponent implements OnInit{

  rowData: any[];

  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;

  colDefs: ColDef[] = [
    { field: "kod" },
    { field: "ad" },
    { field: "birimAdi" },
    { field: "birimFiyat",valueFormatter: params => currencyFormatter(params.data.birimFiyat, "₺ "), },
  ];

  /**
   *
   */
  constructor(private StokService: StokService,private router:Router) {


  }
  ngOnInit(): void {

  }
rowDataCount:any;
  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.StokService.GetList(() => { })).data.items;
   this.rowDataCount=this.rowData.length
  }

  filterSideMenu() {
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
    this.onBtAdd()
  }

  

  onSelectionChanged() {
  
    const selectedRows = this.gridApi.getSelectedRows()[0];

    this.router.navigate(['/stok/detail'],{state:selectedRows})
  }

  onBtAdd() {
    var selectedRows = this.gridApi.getSelectedNodes();

    this.gridApi.applyTransaction({ add: [{ad:"Aaaaaaaaaaa"+Date.now()}], addIndex: this.gridApi.getLastDisplayedRow() + 1 })
  }
}


function currencyFormatter(currency, sign) {
  var sansDec = currency.toFixed(0);
  var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return sign + `${formatted}`;
}
function stringFormatter(params) {
  var fruit = params.value;
  var firstChar = fruit.slice(0, 1).toUpperCase();
  return firstChar + fruit.slice(1);
}