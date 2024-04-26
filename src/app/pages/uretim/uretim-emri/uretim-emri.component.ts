import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { UretimEmriService } from './core/services/uretim-emri.service';


@Component({
  selector: 'app-uretim-emri',
  templateUrl: './uretim-emri.component.html',
  styleUrls: ['./uretim-emri.component.scss'],

})
export class UretimEmriComponent implements OnInit {


  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;


  constructor(
   private UretimEmriService:UretimEmriService,
    private router:Router,
    ) { }

  ngOnInit(): void {

  }


  colDefs: ColDef[] = [
    { field: "stokKodu" },
    { field: "stokAdi" },
    { field: "miktar" },
    { field: "birimAdi" },
    { field: "calismaZamani" },


  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
     this.rowData = (await this.UretimEmriService.GetList(() => { })).data.items;
  }
  onSelectionChanged() {
  
    const selectedRows = this.gridApi.getSelectedRows()[0];

    this.router.navigate(['/pages/uretim-emri/detail-uretim-emri'],{state:selectedRows})
  }

  filterSideMenu() {
    // document.getElementById("filter_menu").style.width ="200px";
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
  }


}
