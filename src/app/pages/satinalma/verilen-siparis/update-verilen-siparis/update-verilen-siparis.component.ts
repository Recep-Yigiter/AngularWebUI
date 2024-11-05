import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CreateTeklifModel } from 'src/app/core/models/teklifler/create-teklif-model';

import { TeklifService } from 'src/app/core/services/repository/teklif.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { CariSelectModalComponents } from 'src/app/shared/utilities/modals/cari-selected-modal';
import { StokSelectModalComponents } from 'src/app/shared/utilities/modals/stok-selected-modal';
import { DatePipe } from '@angular/common';
import { UpdateTeklifModel } from 'src/app/core/models/teklifler/update-teklif-model';
import { TeklifHareketService } from 'src/app/core/services/repository/teklif-hareket.service';
import { UpdateSiparisModel } from 'src/app/core/models/siparisler/update-siparis-model';
import { SiparisService } from 'src/app/core/services/repository/siparis.service';

@Component({
  selector: 'app-update-verilen-siparis',
  templateUrl: './update-verilen-siparis.component.html',
  styleUrls: ['./update-verilen-siparis.component.scss'],
  providers: [ DatePipe],
})
export class UpdateVerilenSiparisComponent implements OnInit {
  @Input() data: any;
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;
  createdDate: any = new Date();
  dateTimeTeslim: any = new Date();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private SiparisService: SiparisService,
    public activeModal: NgbActiveModal,
    private NgbModal: NgbModal,
    private DatePipe: DatePipe,
    private TeklifHareketService: TeklifHareketService
  ) {}
  ngOnInit(): void {
    this.createdDate = this.DatePipe.transform(
      this.data.createdDate,
      'yyyy-MM-dd'
    );
    this.dateTimeTeslim = this.DatePipe.transform(
      this.data.teslimTarihi,
      'yyyy-MM-dd'
    );
    this.dataControl();
  }

  public frm: FormGroup = this.fb.group({
    siparisTuru: [null, [Validators.required, Validators.maxLength(16)]],
    seri: [null, [Validators.required, Validators.maxLength(16)]],
    belgeNo: [null, [Validators.required, Validators.maxLength(16)]],
    referans: [null, [Validators.required, Validators.maxLength(16)]],
    kdv: [null, [Validators.required, Validators.maxLength(16)]],
    otv: [null, [Validators.required, Validators.maxLength(16)]],
    cariId: [null],
    aciklama: [null],
    tarih: [null],
    teslimTarihi: [null],
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

  get siparisTuru() {
    return this.frm.get('siparisTuru');
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
  get teslimTarihi() {
    return this.frm.get('teslimTarihi');
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
    const createModel = new UpdateSiparisModel();
    createModel.id = this.data.id;
    createModel.belgeNo = this.frm.value.belgeNo;
    createModel.siparisTuru = 1;
    createModel.seri = 'VS';
    createModel.siparisTuru = 'Verilen';
    createModel.referans = this.frm.value.referans;
    createModel.cariId = this.selectedCari?.id
      ? this.selectedCari?.id
      : this.data.cariId;
    createModel.kdv = String(this.frm.value.kdv);
    createModel.otv = String(this.frm.value.otv);
    createModel.aciklama = this.frm.value.aciklama;
    createModel.teslimTarihi = this.frm.value.opsiyonTarihi;
    createModel.hourId = String(new Date().valueOf());
    createModel.siparisHareketler = this.getAllRowData();

    this.SiparisService.delete(this.data.id);
    this.SiparisService.create(
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
    this.rowData = this.data.siparisHareketler;
  }
  getAllRowData() {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  }
  deleteRowData() {
    this.gridApi.applyTransaction({ remove: [this.selectedRow] });
  }
  async dataControl() {
    this.data.satirSayisi = this.data.siparisHareketler.length;
    this.data.siparisHareketler.forEach((item, index) => {
      item.iskontoTutar = (item.miktar * item.birimFiyat * item.iskonto) / 100;
      item.satirTutar = item.miktar * item.birimFiyat;
      item.kdvTutar =
        ((item.satirTutar - item.iskontoTutar) * this.frm.value.kdv) / 100;
    });
    this.frmSatirTutari = this.data.siparisHareketler.reduce(
      (prev: any, next: any) => prev + next.satirTutar,
      0
    );
    this.frmIskontoTutari = this.data.siparisHareketler.reduce(
      (prev: any, next: any) => prev + next.iskontoTutar,
      0
    );
    this.frmSatirKdvTutari = this.data.kdvTutar;
    this.frmIskontoSonTutar = this.frmSatirTutari - this.frmIskontoTutari;
    this.frmToplam = this.frmIskontoSonTutar + this.frmSatirKdvTutari;

    this.rowData = this.data.siparisHareketler;
  }

  rowClick(event) {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedRow = selectedRows;
    this.buttonDisabled = false;
  }

  frmSatirTutari;
  frmIskontoTutari;
  frmSatirKdvTutari;
  frmIskontoSonTutar;
  frmToplam;
  onCellValueChanged() {
    this.getAllRowData().forEach((item) => {
      item.toplamTutar = item.miktar * item.birimFiyat;
      item.iskontoTutar = (item.miktar * item.birimFiyat * item.iskonto) / 100;
      item.satirTutar = item.miktar * item.birimFiyat;
      item.kdvTutar =
        ((item.toplamTutar - item.iskontoTutar) * this.frm.value.kdv) / 100;
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

  ekle() {
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
