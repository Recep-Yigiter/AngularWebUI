import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from 'src/app/core/services/api-client.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UrunReceteService } from 'src/app/pages/uretim/urun-recete/core/services/urun-recete.service';
import { DepoService } from '../../../core/services/repository/depo.service';

@Component({
  selector: 'app-detail-depo-hareketler',
  templateUrl: './detail-depo-hareketler.component.html',
  styleUrls: ['./detail-depo-hareketler.component.scss']
})
export class DetailDepoHareketlerComponent implements OnInit {

  BirimDataSource: any[]
  selectedBirim: any;
  selectedOption: any;
  rowData: any[];
  rowData2: any[];
  frameworkComponents: any;
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;

  colDefs: ColDef[] = [

    { field: "faturaTuru", headerName: "F. Türü", width: 80 },
    { field: "stokKodu", },
    { field: "stokAdi", },
    { field: "birimAdi", width: 100 },
    { field: "miktar", width: 100 },
  ];



  constructor(

    

    private DepoService: DepoService,
    private router: Router
  ) {
    this.stateData = history.state


  }

  stateData: any;
  Depo: any;
  async ngOnInit() {
    this.stateControl();

  }





  async stateControl() {

    if (this.stateData?.id) {

      this.rowData = this.stateData.faturaHareketler;
      this.rowData.forEach((item) => {
        item.faturaTuru = item.fatura.faturaString

      })


    }
    else {
      this.Depo = (await this.DepoService.getByHourId(this.stateData.hourId, () => { }));
      this.rowData = this.Depo.faturaHareketler;

    }
  }

  async islemler() {
    if (this.stateData?.id) {

      this.router.navigate(['/depo/detail'], { state: history.state })

    }
    else {

      this.Depo = (await this.DepoService.getByHourId(this.stateData.hourId, () => { }));
      this.router.navigate(['/depo/detail'], { state: this.Depo })

    }

  }









}
