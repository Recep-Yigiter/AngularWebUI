import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { StokService } from '../../core/services/repository/stok.service';
import { Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-stok',
  templateUrl: './stok.component.html',
  styleUrls: ['./stok.component.scss']
})
export class StokComponent implements OnInit {

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
 async ngOnInit() {

  }
rowDataCount:any;
  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.StokService.GetList(() => { },error=>console.log(error))).items;
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