import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from 'src/app/core/services/api-client.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { CreateUretimEmriModel } from '../core/models/create-uretim-emri-model';
import { DeleteButtonComponent } from '../../urun-recete/components/delete-button/delete-button.component';
import { StokSelectModalComponent } from '../../urun-recete/components/stok-select-modal/stok-select-modal.component';
import { OperasyonSelectModalComponent } from '../../urun-recete/components/operasyon-select-modal/operasyon-select-modal.component';
import { UrunReceteService } from 'src/app/core/services/repository/urun-recete.service';
import { StokSelectModalComponents } from 'src/app/shared/utilities/modals/stok-selected-modal';
import { CariSelectModalComponents } from 'src/app/shared/utilities/modals/cari-selected-modal';
import { UrunReceteSelectModalComponents } from 'src/app/shared/utilities/modals/urun-recete-selected-modal';
import { UretimEmriService } from 'src/app/core/services/repository/uretim-emri.service';
import { DepoSelectModalComponents } from 'src/app/shared/utilities/modals/depo-selected-modal';

declare var $: any;

@Component({
  selector: 'app-create-uretim-emri',
  templateUrl: './create-uretim-emri.component.html',
  styleUrls: ['./create-uretim-emri.component.scss'],
})
export class CreateUretimEmriComponent implements OnInit {
  BirimDataSource: any[];
  selectedStok: any;
  selectedOption: any;
  UrunReceteDataSource: any[];
  stokDataSource: any[];
  defaultBirimFiyat = 0;
  rowData: any[];
  rowData2: any[];

  frameworkComponents: any;
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;

  private gridApiOperasyonlar!: GridApi<any>;

  constructor(private fb: FormBuilder, 
    public activeModal: NgbActiveModal,
    private UretimEmriService:UretimEmriService
  ) {}
  ngOnInit() {}

  public frm: FormGroup = this.fb.group({
    siparisTarihi: [null],
    teslimTarihi: [null],
    sevkTarihi: [null],
    referans: [null],
    urunReceteId: [null],
    urunReceteKodu: [null],
    miktar: [null],
    cariId: [null],
    depoId: [null],
    cariKodu: [null],
    uretimDurumu: [null],
  });

  get siparisTarihi() {
    return this.frm.get('siparisTarihi');
  }
  get teslimTarihi() {
    return this.frm.get('teslimTarihi');
  }
  get sevkTarihi() {
    return this.frm.get('sevkTarihi');
  }
  get referans() {
    return this.frm.get('referans');
  }
  get urunReceteId() {
    return this.frm.get('urunReceteId');
  }
  get urunReceteKodu() {
    return this.frm.get('urunReceteKodu');
  }
  get miktar() {
    return this.frm.get('miktar');
  }
  get cariId() {
    return this.frm.get('cariId');
  }
  get depoId() {
    return this.frm.get('depoId');
  }
  get cariKodu() {
    return this.frm.get('cariKodu');
  }
  get uretimDurumu() {
    return this.frm.get('uretimDurumu');
  }

  dataSourceUretimDurumu: any = [
    { ad: 'Beklemede' },
    { ad: 'Üretiliyor' },
    { ad: 'Sevk Edildi' },
  ];

  CariSelectModalComponent: any = CariSelectModalComponents;
  DepoSelectModalComponent: any = DepoSelectModalComponents;
  UrunReceteSelectModalComponent: any = UrunReceteSelectModalComponents;
  Kaydet() {
    this.frm.value.uretimDurumu = this.frm.value.uretimDurumu.ad;
    this.frm.value.urunReceteId = this.selectedUrunRecete.id;
    this.frm.value.cariId = this.selectedCari.id;
    this.frm.value.depoId = this.selectedDepo.id;
    this.frm.value.hourId = String(new Date().valueOf());

    // this.frm.value.sevkTarihi = this.frm.value.sevkTarihi==undefined?'NULL':this.frm.value.sevkTarihi;

    this.UretimEmriService.create(this.frm.value, () => {
      this.activeModal.close(false)
    },
     errorMessage => {})
  }

  selectedCari: any;
  CariChildFunc(event) {
    this.selectedCari = event;
  }

  selectedDepo: any;
  DepoChildFunc(event) {
    this.selectedDepo = event;
  }

  selectedUrunRecete: any;
  UrunReceteChildFunc(event) {
    this.selectedUrunRecete = event;

  }

  cikis(){
    this.activeModal.close(false)
  }
}
