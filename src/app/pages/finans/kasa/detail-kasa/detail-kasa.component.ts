import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KasaService } from 'src/app/core/services/repository/kasa.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
@Component({
  selector: 'app-detail-kasa',
  templateUrl: './detail-kasa.component.html',
  styleUrls: ['./detail-kasa.component.scss']
})
export class DetailKasaComponent implements OnInit {

  stateData: any;
  constructor(private router: Router, private KasaService: KasaService) {
    this.stateData = history.state
  }
  ngOnInit(): void {

  }

  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string; } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;



  colDefs: ColDef[] = [
    { field: "ad" , width: 200, filter: "agTextColumnFilter",},
    { field: "kod" , width: 200, filter: "agTextColumnFilter",},

  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;

  }
  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
  }
  rowDblClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.router.navigate(['/menu/malzeme-yonetimi/birim/detail'],{state:selectedRows})
  }







  Kasa: any;
  async duzenle() {


    if (this.stateData?.id) {

      this.router.navigate(['/menu/finans/kasa/update'], { state: history.state })

    }
    else {

      this.Kasa = (await this.KasaService.getByHourId(this.stateData.hourId, () => { }));
      this.router.navigate(['/menu/finans/kasa/update'], { state: this.Kasa })

    }
  }



}
