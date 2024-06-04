import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from 'src/app/core/services/api-client.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UretimEmriService } from '../../uretim-emri/core/services/uretim-emri.service';

@Component({
  selector: 'app-detail-uretim-maliyet-analizi',
  templateUrl: './detail-uretim-maliyet-analizi.component.html',
  styleUrls: ['./detail-uretim-maliyet-analizi.component.scss']
})
export class DetailUretimMaliyetAnaliziComponent implements OnInit {

  BirimDataSource: any[]
  selectedBirim: any;
  selectedOption: any;
  rowData: any[];
  rowData2: any[];
  frameworkComponents: any;
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;

  colDefs: ColDef[] = [
    { field: "stokAdi", width: 600 },
    { field: "miktar", },
    { field: "birimAdi" },
  ];

  colDefs2: ColDef[] = [
    { field: "ad", width: 600, editable: true },
    { field: "isMerkeziAdi", },
    { field: "isMerkeziKodu" },
    { field: "", width: 50, },

  ];

  constructor(

    private router: Router,

    private UretimEmriService: UretimEmriService
  ) {
    this.stateData = history.state


  }

  stateData: any;
  urunRecete: any;
  async ngOnInit() {

    this.stateControl();

  }




  duzenle() {
    if (this.stateData?.id) {
     
      this.router.navigate(['/pages/urun-recete/update-urun-recete'], { state: this.stateData })
    }
    else {

      this.router.navigate(['/pages/urun-recete/update-urun-recete'], { state: this.urunRecete })
    }


  }

  async stateControl() {
    this.stateData.toplamMaliyet = this.stateData.toplamBilesenMaliyeti + 0 
    if (this.stateData?.id) {
      this.rowData = this.stateData.urunReceteBilesenler;
      this.rowData2 = this.stateData.operasyonlar;
    }
    else {
      this.urunRecete = (await this.UretimEmriService.getByHourId(this.stateData.hourId, () => { }))
      this.rowData = this.urunRecete.urunReceteBilesenler;
      this.rowData2 = this.urunRecete.operasyonlar;
    }
  }















}
