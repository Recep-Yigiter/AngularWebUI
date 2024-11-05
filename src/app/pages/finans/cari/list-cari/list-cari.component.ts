import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { CariService } from 'src/app/core/services/repository/cari.service';
import * as resize from '../../../../../assets/js/resizable-layout.js';

@Component({
  selector: 'app-list-cari',
  templateUrl: './list-cari.component.html',
  styleUrls: ['./list-cari.component.scss']
})
export class ListCariComponent implements OnInit {


  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string; } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  constructor(
    private CariService: CariService,
    private router:Router,
    ) { }
items:any;
  async ngOnInit() {
    resize.resizeFunction()




    this.items = [
      {
      label:'File',
      icon:'pi pi-fw pi-file',
      items:[
          {
              label:'New',
              icon:'pi pi-fw pi-plus',
              items:[
                  {
                  label:'Bookmark',
                  icon:'pi pi-fw pi-bookmark'
                  },
                  
              ]
            }
          ]
    }
  ]














    
  }


  colDefs: ColDef[] = [
    { field: "kod" ,headerName:"Kod", width: 200, filter: "agTextColumnFilter",},
    { field: "ad" ,headerName:"Ad", width: 600, filter: "agTextColumnFilter",},
    { field: "borc" ,headerName:"Borç", width: 200, filter: "agTextColumnFilter",cellRenderer: this.CurrencyCellRendererTR},
    { field: "alacak" ,headerName:"Alacak", width: 200, filter: "agTextColumnFilter", cellRenderer: this.CurrencyCellRendererTR},
    { field: "borcBakiye" ,headerName:"Borç Bakiye", width: 200, filter: "agTextColumnFilter",cellRenderer: this.CurrencyCellRendererTR},
    { field: "alacakBakiye" ,headerName:"Alacak Bakiye", width: 200, filter: "agTextColumnFilter",cellRenderer: this.CurrencyCellRendererTR},

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
    this.rowData = (await this.CariService.GetList(() => { }, errorMessage =>{console.log("Hata....",errorMessage.error)} )).items;

  }
  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
  }
  rowDblClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.router.navigate(['/menu/finans/cari/detail'],{state:selectedRows})
  }


  filterSideMenu() {
    // document.getElementById("filter_menu").style.width ="200px";
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
  }


}
