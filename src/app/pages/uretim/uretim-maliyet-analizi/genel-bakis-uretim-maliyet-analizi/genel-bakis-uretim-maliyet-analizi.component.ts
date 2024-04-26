import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { UretimEmriService } from '../../uretim-emri/core/services/uretim-emri.service';

@Component({
  selector: 'app-genel-bakis-uretim-maliyet-analizi',
  templateUrl: './genel-bakis-uretim-maliyet-analizi.component.html',
  styleUrls: ['./genel-bakis-uretim-maliyet-analizi.component.scss']
})
export class GenelBakisUretimMaliyetAnaliziComponent implements OnInit {


  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  stateData: any;

  constructor(

    private router: Router,
  ) {
    this.stateData = history.state
  }

  ngOnInit(): void {

  }


  colDefs: ColDef[] = [
    { field: "stokKodu", headerName: 'Üretim Emri', width: 300 },
    { field: "stokAdi", headerName: 'Stok', width: 450, },
    { field: "uretimTarihi", headerName: 'Üretim Tarihi', width: 350 },
  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = this.stateData.groupByUretimEmri;

  }
  onSelectionChanged() {

    const selectedRows = this.gridApi.getSelectedRows()[0];
   
    this.router.navigate(['/pages/uretim-maliyet-analizi/detail-uretim-maliyet-analizi'], { state: selectedRows })
  }

  filterSideMenu() {
    // document.getElementById("filter_menu").style.width ="200px";
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
  }





}
