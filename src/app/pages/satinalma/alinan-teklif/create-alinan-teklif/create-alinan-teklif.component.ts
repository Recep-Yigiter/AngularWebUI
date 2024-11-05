import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CreateTeklifModel } from 'src/app/core/models/teklifler/create-teklif-model';

import { TeklifService } from 'src/app/core/services/repository/teklif.service';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  CellClassParams,
} from 'ag-grid-community';

import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { CariSelectModalComponent } from 'src/app/shared/components/cari-select-modal/cari-select-modal.component';
import { CariSelectModalComponents } from 'src/app/shared/utilities/modals/cari-selected-modal';
import { StokSelectModalComponents } from 'src/app/shared/utilities/modals/stok-selected-modal';

@Component({
  selector: 'app-create-alinan-teklif',
  templateUrl: './create-alinan-teklif.component.html',
  styleUrls: ['./create-alinan-teklif.component.scss'],
})
export class CreateAlinanTeklifComponent  implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;

  constructor(
    private fb: FormBuilder,
    private TeklifService: TeklifService,
    public activeModal: NgbActiveModal,
    private NgbModal: NgbModal
  ) {}
  ngOnInit(): void {}

  public frm: FormGroup = this.fb.group({
    teklifTuru: [null, [Validators.required, Validators.maxLength(16)]],
    seri: [null, [Validators.required, Validators.maxLength(16)]],
    belgeNo: [null, [Validators.required, Validators.maxLength(16)]],
    referans: [null, [Validators.required, Validators.maxLength(16)]],
    kdv: [null, [Validators.required, Validators.maxLength(16)]],
    otv: [null, [Validators.required, Validators.maxLength(16)]],
    cariId: [null],
    aciklama: [null],
    tarih: [null],
    opsiyonTarihi: [null],
    onay: [null],
    durum: [null],
    duzenleyen: [null],
    duzenlemeTarihi: [null],
    satirTutari: [null],
    iskontoTutari: [null],
    iskontoSonTutar: [null],
    satirKdvTutari: [null],
    toplam: [null],
  });

  get teklifTuru() {
    return this.frm.get('teklifTuru');
  }
  get seri() {
    return this.frm.get('seri');
  }
  get belgeNo() {
    return this.frm.get('belgeNo');
  }
  get referans() {
    return this.frm.get('referans');
  }
  get kdv() {
    return this.frm.get('kdv');
  }
  get otv() {
    return this.frm.get('otv');
  }
  get cariId() {
    return this.frm.get('cariId');
  }
  get opsiyonTarihi() {
    return this.frm.get('opsiyonTarihi');
  }
  get onay() {
    return this.frm.get('onay');
  }
  get durum() {
    return this.frm.get('durum');
  }
  get aciklama() {
    return this.frm.get('aciklama');
  }
  get duzenleyen() {
    return this.frm.get('duzenleyen');
  }
  get duzenlemeTarihi() {
    return this.frm.get('duzenlemeTarihi');
  }
  get satirTutari() {
    return this.frm.get('satirTutari');
  }
  get iskontoTutari() {
    return this.frm.get('iskontoTutari');
  }
  get iskontoSonTutar() {
    return this.frm.get('iskontoSonTutar');
  }
  get satirKdvTutari() {
    return this.frm.get('satirKdvTutari');
  }
  get toplam() {
    return this.frm.get('toplam');
  }

  colDefs: ColDef[] = [
    { field: 'stokAdi', width: 300 },
    {
      field: 'miktar',
      editable: true,
      valueFormatter: (params) => params.data.miktar.toFixed(2),
    },
    { field: 'birimAdi' },
    {
      field: 'birimFiyat',
      editable: true,
      cellRenderer: this.CurrencyCellRendererTR,
    },
    {
      field: 'iskonto',
      headerName: 'isk.(%)',
      width: 80,
      editable: true,
      valueFormatter: (params) => params.data.iskonto.toFixed(2) + ' %',
    },
    {
      field: 'iskontoTutar',
      headerName: 'isk. Tutarı',
      width: 120,
      cellRenderer: this.CurrencyCellRendererTR,
    },
    { field: 'satirTutar', cellRenderer: this.CurrencyCellRendererTR },
  ];
  Kaydet() {
    const createModel = new CreateTeklifModel();
    createModel.belgeNo = this.frm.value.belgeNo;
    createModel.teklifTuru = 1;
    createModel.seri = 'AT';
    createModel.durum = 'Açık';
    createModel.referans = this.frm.value.referans;
    createModel.cariId = this.selectedCari?.id;
    createModel.kdv = String(this.frm.value.kdv);
    createModel.otv = String(this.frm.value.otv);
    createModel.aciklama = this.frm.value.aciklama;
    createModel.opsiyonTarihi = this.frm.value.opsiyonTarihi;
    createModel.hourId = String(new Date().valueOf());
    createModel.teklifHareketler = this.getAllRowData()


    this.TeklifService.create(
      createModel,
      () => {
        this.activeModal.close(true);
      },
      (errorMessage) => {}
    );
  }

  cikis() {
    this.activeModal.close(false);
  }

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = [];
  }
  rowClick(event) {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedRow = selectedRows;
  }

  getAllRowData() {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  }

  frmSatirTutari;
  frmIskontoTutari;
  frmSatirKdvTutari;
  frmIskontoSonTutar;
  frmToplam;
  onCellValueChanged() {
    this.getAllRowData().forEach((item) => {
      item.iskontoTutar = (item.miktar * item.birimFiyat * item.iskonto) / 100;
      item.satirTutar = item.miktar * item.birimFiyat;
      item.kdvTutar = ((item.satirTutar - item.iskontoTutar) * this.frm.value.kdv) / 100;
      });

    this.frmSatirTutari = this.getAllRowData().reduce(   (prev: any, next: any) => prev + next.satirTutar,   0 );
    this.frmIskontoTutari = this.getAllRowData().reduce(  (prev: any, next: any) => prev + next.iskontoTutar,  0);
    this.frmSatirKdvTutari = this.getAllRowData().reduce(  (prev: any, next: any) => prev + next.kdvTutar,  0);
    this.frmIskontoSonTutar = this.frmSatirTutari - this.frmIskontoTutari;
    this.frmToplam = this.frmIskontoSonTutar + this.frmSatirKdvTutari;

    const selectedRows = this.gridApi.getSelectedRows()[0];

    if (selectedRows != undefined) {
      // this.selectedTeklifHareket = selectedRows;
      this.gridApi.applyTransaction({
        update: [selectedRows],
        addIndex: this.gridApi.getLastDisplayedRow() + 1,
      });
    }
  }

  kdvChanced() {this.onCellValueChanged()}
  otvChanced() {this.onCellValueChanged()}

  stokEkle() {
    const modalRef = this.NgbModal.open(StokSelectModalComponents, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
    modalRef.result.then((stok) => {
      if (stok != false) {
        stok.stokId = stok.id;
        stok.stokAdi = stok.ad;
        stok.hourId = String(new Date().valueOf());
        stok.miktar = 1;
        stok.iskonto = 0;
        stok.iskontoTutar = 0;
        stok.satirTutar = stok.miktar * stok.birimFiyat;
        this.gridApi.applyTransaction({
          add: [stok],
          addIndex: this.gridApi.getLastDisplayedRow() + 1,
        });
      }
    });
  }


  CariSelectModalComponent: any = CariSelectModalComponents;
  selectedCari: any;
  CariChildFunc(event) {
    this.selectedCari = event;
  }

  CurrencyCellRendererTR(params: any) {
    var inrFormat = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
    });
    return inrFormat.format(params.value);
  }
}
