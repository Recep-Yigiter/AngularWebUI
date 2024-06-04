import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from 'src/app/core/services/api-client.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UretimEmriService } from '../core/services/uretim-emri.service';
import { DeleteButtonComponent } from '../components/delete-button/delete-button.component';

@Component({
  selector: 'app-detail-uretim-emri',
  templateUrl: './detail-uretim-emri.component.html',
  styleUrls: ['./detail-uretim-emri.component.scss']
})
export class DetailUretimEmriComponent implements OnInit {

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

    private UretimEmriService: UretimEmriService
  ) {
    this.stateData = history.state
    this.frameworkComponents = {
      buttonRenderer: DeleteButtonComponent,
    }

  }

  stateData: any;
  UretimEmri: any;
  async ngOnInit() {

    this.stateControl();
  
  }




  duzenle() {
    
    if (this.stateData?.id) {
     
      this.router.navigate(['/pages/uretim-emri/update-uretim-emri'], { state: this.stateData })
    }
    else {
      
      this.router.navigate(['/pages/uretim-emri/update-uretim-emri'], { state: this.UretimEmri })
    }


  }

  async stateControl() {
    if (this.stateData?.id) {
      this.rowData = this.stateData.uretimEmriBilesenler;
      // this.rowData2 = this.stateData.operasyonlar;
    }
    else {
      this.UretimEmri = (await this.UretimEmriService.getByHourId(this.stateData.hourId, () => { }))
      this.rowData = this.UretimEmri.uretimEmriBilesenler;
      // this.rowData2 = this.UretimEmri.operasyonlar;
    }
  }















}
