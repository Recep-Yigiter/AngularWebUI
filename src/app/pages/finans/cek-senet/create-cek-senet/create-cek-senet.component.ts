import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlinanCekService } from 'src/app/core/services/repository/alinan-cek.service';
import { CariSelectModalComponent } from 'src/app/shared/components/cari-select-modal/cari-select-modal.component';
import { BankaSelectModalComponents } from 'src/app/shared/utilities/modals/banka-selected-modal';
import { CariSelectModalComponents } from 'src/app/shared/utilities/modals/cari-selected-modal';
import { KasaSelectModalComponents } from 'src/app/shared/utilities/modals/kasa-selected-modal';
import { SubeSelectModalComponents } from 'src/app/shared/utilities/modals/sube-selected-modal';
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ILargeTextEditorParams,
  IRichCellEditorParams,
  ISelectCellEditorParams,
  ITextCellEditorParams,
  ModuleRegistry,
  ValueFormatterParams,
  createGrid,
} from 'ag-grid-community';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { DropDownCellRenderer } from '../core/components/dropdown-cell-renderer.component';
import { CekSenetService } from 'src/app/core/services/repository/cek-senet.service';
import { CariHareketService } from 'src/app/core/services/repository/cari-hareket.service';

@Component({
  selector: 'app-create-cek-senet',
  templateUrl: './create-cek-senet.component.html',
  styleUrls: ['./create-cek-senet.component.scss'],
  providers: [DatePipe],
})
export class CreateCekSenetComponent implements OnInit {
  @Input() data: any;
  dateTime: any = new Date();
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;
  getIslemNo: any = String(new Date().valueOf());
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private CekSenetService: CekSenetService,
    private CariHareketService: CariHareketService
  ) {}
  ngOnInit(): void {
    console.log(this.data);
  }

  public frm: FormGroup = this.fb.group({
    islemTuru: [null, [Validators.required]],
    islemNo: [null, [Validators.required]],
    islemTarihi: [null, [Validators.required]],
    alinisTarihi: [null, [Validators.required]],
    cariId: [null, [Validators.required]],
    cariAdi: [null, [Validators.required]],
    personel: [null, [Validators.required]],
    adres: [null, [Validators.required]],
    bordroTutari: [null, [Validators.required]],
    paraBirimi: [null, [Validators.required]],
    aciklama: [null, [Validators.required]],
    vadeTarihi: [null, [Validators.required]],
    ciro: [null, [Validators.required]],
    ilkSahibi: [null, [Validators.required]],
    tutar: [null, [Validators.required]],
    seriNo: [null, [Validators.required]],
    banka: [null, [Validators.required]],
    bankaSube: [null, [Validators.required]],
    hesapNo: [null, [Validators.required]],
    sehir: [null, [Validators.required]],
    durum: [null, [Validators.required]],
  });

  get islemTuru() {
    return this.frm.get('islemTuru');
  }
  get islemNo() {
    return this.frm.get('islemNo');
  }
  get islemTarihi() {
    return this.frm.get('islemTarihi');
  }
  get cariId() {
    return this.frm.get('cariId');
  }
  get cariAdi() {
    return this.frm.get('cariAdi');
  }
  get personel() {
    return this.frm.get('personel');
  }
  get adres() {
    return this.frm.get('adres');
  }
  get tutar() {
    return this.frm.get('tutar');
  }
  get bordroTutari() {
    return this.frm.get('bordroTutari');
  }
  get paraBirimi() {
    return this.frm.get('paraBirimi');
  }
  get aciklama() {
    return this.frm.get('aciklama');
  }

  get vadeTarihi() {
    return this.frm.get('vadeTarihi');
  }
  get alinisTarihi() {
    return this.frm.get('alinisTarihi');
  }
  get ciro() {
    return this.frm.get('ciro');
  }
  get ilkSahibi() {
    return this.frm.get('ilkSahibi');
  }
  get seriNo() {
    return this.frm.get('seriNo');
  }
  get banka() {
    return this.frm.get('banka');
  }
  get bankaSube() {
    return this.frm.get('bankaSube');
  }
  get sehir() {
    return this.frm.get('sehir');
  }
  get durum() {
    return this.frm.get('durum');
  }

  Kaydet() {
    this.getAllRowData().forEach((item) => {
      let cekSenet = {
        islemNo: this.frm.value.islemNo,
        cariId: this.selectedCari?.id,
        aciklama: this.frm.value.aciklama,
        vadeTarihi: item.vadeTarihi,
        alinisTarihi: this.frm.value.alinisTarihi,
        ciro: item.ciro == 'Evet' ? true : false,
        ilkSahibi: item.ilkSahibi,
        tutar: item.tutar,
        seriNo: this.frm.value.seriNo,
        banka: item.banka,
        bankaSube: item.bankaSube,
        hesapNo: item.hesapNo,
        sehir: item.sehir,
        durum: 1,
        cekSenetTipi: this.data.cekSenetTipi,
        cekSenetHareketler: [
          {
            // cekSenetId: '',
            islemTarihi: this.frm.value.alinisTarihi,
            islem: 1, //Kasadan Tahsil Edildi (Enum)
            karsiHesap: 'Cari',
            karsiHesapId: this.selectedCari.id,
            karsiHesapAdi: this.selectedCari.ad,
            karsiHesapKodu: this.selectedCari.kod,
          },
        ],
      };

      this.CekSenetService.create(
        cekSenet,
        () => {
          this.activeModal.close(cekSenet);
        },
        (errorMessage) => {}
      );
    });
  }

  colDefs: ColDef[] = [
    {
      field: 'vadeTarihi',
      headerName: 'Vade Tarihi',
      width: 100,
      editable: true,
      valueFormatter: (params: ValueFormatterParams<any, Date>) => {
        if (!params.value) {
          return '';
        }
        const month = params.value.getMonth() + 1;
        const day = params.value.getDate();
        return `${params.value.getFullYear()}-${
          month < 10 ? '0' + month : month
        }-${day < 10 ? '0' + day : day}`;
      },
      cellEditor: 'agDateCellEditor',
    },
    {
      field: 'ciro',
      headerName: 'Ciro',
      editable: true,
      width: 100,
      cellRenderer: DropDownCellRenderer,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ciro,
      } as ISelectCellEditorParams,
    },
    {
      field: 'ilkSahibi',
      editable: true,
      headerName: 'İlk Sahibi',
      width: 100,
    },
    {
      field: 'tutar',
      editable: true,
      headerName: 'Tutar',
      width: 100,
      cellRenderer: this.CurrencyCellRendererTR,
    },
    { field: 'banka', editable: true, headerName: 'Banka', width: 150 },
    {
      field: 'bankaSube',
      editable: true,
      headerName: 'Banka Şube',
      width: 100,
    },
    {
      field: 'hesapNo',
      editable: true,
      headerName: 'Hesap No',
      width: 200,
    },
    {
      field: 'sehir',
      editable: true,
      headerName: 'Şehir',
      width: 200,
    },
  ];
  CurrencyCellRendererTR(params: any) {
    var inrFormat = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
    });
    return inrFormat.format(params.value);
  }
  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = [
      {
        ciro: 'Hayır',
        cekSenetTipi: 'Çek',
        bordroTipi: 'Müşteri Çeki',
        vadeTarihi: this.date,
        tutar: 0,
      },
    ];
  }

  getAllRowData() {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data));
    return rowData;
  }
  date: Date = new Date();
  yeniSatir() {
    let yeniSatir = {
      ciro: 'Hayır',
      cekSenetTipi: 'Çek',
      vadeTarihi: this.date,
      tutar: 0,
    };
    this.gridApi.applyTransaction({
      add: [yeniSatir],
      addIndex: this.gridApi.getLastDisplayedRow() + 1,
    });
  }

  cikis() {
    this.activeModal.close(false);
  }

  CariSelectModalComponent: any = CariSelectModalComponents;
  selectedCari: any;
  CariChildFunc(event) {
    this.selectedCari = event;
  }

  KasaSelectModalComponent: any = KasaSelectModalComponents;
  selectedKasa: any;
  KasaChildFunc(event) {
    this.selectedKasa = event;
  }

  BankaSelectModalComponent: any = BankaSelectModalComponents;
  selectedBanka: any;
  BankaChildFunc(event) {
    this.selectedBanka = event;
  }

  SubeSelectModalComponent: any = SubeSelectModalComponents;

  selectedSube: any;
  SubeChildFunc(event) {
    this.selectedSube = event;
  }
}

export const ciro: string[] = ['Evet', 'Hayır'];

export const cekSenetTipi: string[] = ['Çek', 'Senet'];
export const bordroTipi: string[] = [
  'Müşteri Çeki',
  'Müşteri Senedi',
  'Kendi Çekimiz',
  'Kendi Senedimiz',
];

export class CekSenetModel {
  islemNo?: any;
  cariId?: any;
  aciklama?: any;
  vadeTarihi?: any;
  alinisTarihi?: any;
  ciro?: any;
  ilkSahibi?: any;
  tutar?: any;
  seriNo?: any;
  banka?: any;
  bankaSube?: any;
  hesapNo?: any;
  sehir?: any;
  durum?: any;
  cekSenetHareket?: CekSenetHareketModel[];
}

export class CekSenetHareketModel {
  cekSenetId?: any;
  islemTarihi?: any;
  islem?: any;
  karsiHesap?: any;
  karsiHesapAdi?: any;
  karsiHesapKodu?: any;
}
