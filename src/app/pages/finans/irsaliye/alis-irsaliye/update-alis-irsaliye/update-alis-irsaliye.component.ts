import { Component, Input, OnInit } from '@angular/core';
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
import { FaturaService } from 'src/app/core/services/repository/fatura.service';
import { CreateFaturaModel } from 'src/app/core/models/faturalar/create-fatura.model';
import { DepoSelectModalComponents } from 'src/app/shared/utilities/modals/depo-selected-modal';
import { DepoBazindaStokService } from 'src/app/core/services/repository/depo-bazinda-stok.service';
import { DatePipe } from '@angular/common';
import { CreateIrsaliyeModel } from 'src/app/core/models/irsaliyeler/create-irsaliye.model';
import { IrsaliyeService } from 'src/app/core/services/repository/irsaliye.service';

@Component({
  selector: 'app-update-alis-irsaliye',
  templateUrl: './update-alis-irsaliye.component.html',
  styleUrls: ['./update-alis-irsaliye.component.scss'],
  providers: [ DatePipe],
})
export class UpdateAlisIrsaliyeComponent implements OnInit {
  @Input() data: any;
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;
  createdDate: any = new Date();
  dateTimeOpsiyon: any = new Date();
  constructor(
    private fb: FormBuilder,
    private IrsaliyeService: IrsaliyeService,
    public activeModal: NgbActiveModal,
    private NgbModal: NgbModal,
    private DatePipe: DatePipe
  ) {}
  ngOnInit(): void {
    console.log(this.data);
    this.createdDate = this.DatePipe.transform(
      this.data.createdDate,
      'yyyy-MM-dd'
    );
    this.dateTimeOpsiyon = this.DatePipe.transform(
      this.data.opsiyonTarihi,
      'yyyy-MM-dd'
    );
    this.dataControl();
  }

  public frm: FormGroup = this.fb.group({
    faturaTuru: [null, [Validators.required, Validators.maxLength(16)]],
    seri: [null, [Validators.required, Validators.maxLength(16)]],
    belgeNo: [null, [Validators.required, Validators.maxLength(16)]],
    referans: [null, [Validators.required, Validators.maxLength(16)]],
    kdv: [null, [Validators.required, Validators.maxLength(16)]],
    otv: [null, [Validators.required, Validators.maxLength(16)]],
    cariId: [null],
    depoId: [null],
    aciklama: [null],
    eIrsaliye: [null],
    eArsiv: [null],

    irsaliyeTuru: [null],
    irsaliyeKodu: [null],
    eFaturaNo: [null],
    duzenleyen: [null],
    duzenlemeTarihi: [null],
    satirTutari: [null],
    iskontoTutari: [null],
    iskontoSonTutar: [null],
    satirKdvTutari: [null],
    toplam: [null],
  });

  get faturaTuru() {
    return this.frm.get('faturaTuru');
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
  get depoId() {
    return this.frm.get('depoId');
  }
  get aciklama() {
    return this.frm.get('aciklama');
  }
  get eIrsaliye() {
    return this.frm.get('eIrsaliye');
  }
  get eArsiv() {
    return this.frm.get('eArsiv');
  }

  get irsaliyeTuru() {
    return this.frm.get('irsaliyeTuru');
  }
  get irsaliyeKodu() {
    return this.frm.get('irsaliyeKodu');
  }
  get eFaturaNo() {
    return this.frm.get('eFaturaNo');
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
    const createModel = new CreateIrsaliyeModel();
    createModel.belgeNo = this.frm.value.belgeNo;
    createModel.irsaliyeTuru = 2;
    createModel.seri = this.frm.value.seri;
    createModel.referans = this.frm.value.referans;
    createModel.cariId = this.selectedCari?.id? this.selectedCari?.id: this.data.cariId;
    createModel.depoId = this.selectedDepo?.id? this.selectedDepo?.id: this.data.depoId;
    createModel.kdv = String(this.frm.value.kdv);
    createModel.otv = String(this.frm.value.otv);
    createModel.eIrsaliye = this.frm.value.eFatura ? 'e-Irsaliye olacak' : null;
    createModel.eArsiv = this.frm.value.eArsiv ? 'e-Arşiv olacak' : null;
    createModel.aciklama = this.frm.value.aciklama;
    createModel.hourId = String(new Date().valueOf());
    createModel.irsaliyeHareketler = this.getAllRowData();


    this.IrsaliyeService.delete(this.data.id);
    this.IrsaliyeService.create(
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
  DeleteHareket() {
    this.gridApi.applyTransaction({ remove: [this.selectedRow] });
    this.onCellValueChanged();

    return this.rowData;
  }

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = this.data.irsaliyeHareketler;
  }
  rowClick(event) {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedRow = selectedRows;
    this.buttonDisabled = false;
  }
  async dataControl() {

    this.data.depoId = this.data.irsaliyeHareketler[0].depoId;
    this.data.depoAdi = this.data.irsaliyeHareketler[0].depoAdi;
    this.data.depoKodu = this.data.irsaliyeHareketler[0].depoKodu;

    this.data.satirSayisi = this.data.irsaliyeHareketler.length;
    this.data.irsaliyeHareketler.forEach((item, index) => {
      item.iskontoTutar = (item.miktar * item.birimFiyat * item.iskonto) / 100;
      item.satirTutar = item.miktar * item.birimFiyat;
      item.kdvTutar =
        ((item.satirTutar - item.iskontoTutar) * this.frm.value.kdv) / 100;
    });
    this.frmSatirTutari = this.data.irsaliyeHareketler.reduce(
      (prev: any, next: any) => prev + next.satirTutar,
      0
    );
    this.frmIskontoTutari = this.data.irsaliyeHareketler.reduce(
      (prev: any, next: any) => prev + next.iskontoTutar,
      0
    );
    // this.frmSatirKdvTutari = this.data.teklifHareketler.reduce(  (prev: any, next: any) => prev + next.kdvTutar,  0);
    this.frmSatirKdvTutari = this.data.kdvTutar;

    this.frmIskontoSonTutar = this.frmSatirTutari - this.frmIskontoTutari;
    this.frmToplam = this.frmIskontoSonTutar + this.frmSatirKdvTutari;

    this.rowData = this.data.irsaliyeHareketler;
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
      item.kdvTutar =
        ((item.satirTutar - item.iskontoTutar) * this.frm.value.kdv) / 100;
    });

    this.frmSatirTutari = this.getAllRowData().reduce(
      (prev: any, next: any) => prev + next.satirTutar,
      0
    );
    this.frmIskontoTutari = this.getAllRowData().reduce(
      (prev: any, next: any) => prev + next.iskontoTutar,
      0
    );
    this.frmSatirKdvTutari = this.getAllRowData().reduce(
      (prev: any, next: any) => prev + next.kdvTutar,
      0
    );
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

  kdvChanced() {
    this.onCellValueChanged();
  }
  otvChanced() {
    this.onCellValueChanged();
  }

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

  DepoSelectModalComponent: any = DepoSelectModalComponents;
  selectedDepo: any;
  DepoChildFunc(event) {
    this.selectedDepo = event;
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