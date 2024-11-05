import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from 'src/app/core/services/api-client.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StokSelectModalComponent } from '../components/stok-select-modal/stok-select-modal.component';
import { DeleteButtonComponent } from '../components/delete-button/delete-button.component';
import { UrunReceteService } from 'src/app/core/services/repository/urun-recete.service';
@Component({
  selector: 'app-detail-urun-recete',
  templateUrl: './detail-urun-recete.component.html',
  styleUrls: ['./detail-urun-recete.component.scss']
})
export class DetailUrunReceteComponent implements OnInit {

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
    { field: "", width: 50,},

  ];

  constructor(

    private router: Router,

    private UrunReceteService: UrunReceteService
  ) {
    this.stateData = history.state
    this.frameworkComponents = {
      buttonRenderer: DeleteButtonComponent,
    }

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
    
    if (this.stateData?.id) {

      this.rowData = this.stateData.urunReceteBilesenler;
      this.rowData2 = this.stateData.operasyonlar;
    }
    else {
    
      this.urunRecete = (await this.UrunReceteService.getByHourId(this.stateData.hourId, () => { }))
      this.rowData = this.urunRecete.urunReceteBilesenler;
      this.rowData2 = this.urunRecete.operasyonlar;
    }
  }















}
