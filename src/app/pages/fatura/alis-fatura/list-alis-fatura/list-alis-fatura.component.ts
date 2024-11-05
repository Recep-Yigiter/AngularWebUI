import { Component, OnInit } from '@angular/core';

import {
  ColDef,
  GridApi,
  GridReadyEvent,
  CellClassParams,
} from 'ag-grid-community';
import { BirimService } from 'src/app/core/services/repository/birim.service';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponents } from 'src/app/shared/utilities/confirms/delete-modal';

import { TeklifService } from 'src/app/core/services/repository/teklif.service';
import { DatePipe } from '@angular/common';
import { CreateVerilenTeklifComponent } from 'src/app/pages/satis/verilen-teklif/create-verilen-teklif/create-verilen-teklif.component';
import { UpdateVerilenTeklifComponent } from 'src/app/pages/satis/verilen-teklif/update-verilen-teklif/update-verilen-teklif.component';
import { FaturaService } from 'src/app/core/services/repository/fatura.service';
import { UpdateAlisFaturaComponent } from '../update-alis-fatura/update-alis-fatura.component';
import { CreateAlisFaturaComponent } from '../create-alis-fatura/create-alis-fatura.component';
import { OnayModalComponents } from 'src/app/shared/utilities/confirms/onay-modal';
import { MuhasebeKodService } from 'src/app/core/services/repository/muhasebe-kod.service';
import { FaturaHareketService } from 'src/app/core/services/repository/fatura-hareket.service';
import { CreateFisFromFaturaComponent } from 'src/app/pages/fis/create-fis-from-fatura/create-fis-from-fatura.component';

@Component({
  selector: 'app-list-alis-fatura',
  templateUrl: './list-alis-fatura.component.html',
  styleUrls: ['./list-alis-fatura.component.scss'],
  providers: [DatePipe],
})
export class ListAlisFaturaComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;

  constructor(
    private FaturaService: FaturaService,
    private MuhasebeKodService: MuhasebeKodService,
private FaturaHareketService:FaturaHareketService,
    private NgbModal: NgbModal,
    private DatePipe: DatePipe
  ) {}

  async ngOnInit() {}

  colDefs: ColDef[] = [
    {
      field: 'createdDate',
      headerName: 'Hareket Tarihi',
      width: 120,
      valueFormatter: (params) =>
        this.DatePipe.transform(params.value, 'dd.MM.yyyy'),
      pinned: 'left',
    },
    { field: 'seri', headerName: 'Seri', width: 70, pinned: 'left' },
    { field: 'belgeNo', headerName: 'Belge No', width: 150, pinned: 'left' },
    { field: 'faturaTuruAdi', headerName: 'Türü', width: 80, pinned: 'left' },
    {
      field: 'kdvTutar',
      headerName: 'Kdv Tutarı',
      width: 100,
      cellRenderer: this.CurrencyCellRendererTR,
    },
    {
      field: 'satirOtv',
      headerName: 'ÖTV Tutarı',
      width: 100,
      cellRenderer: this.CurrencyCellRendererTR,
    },
    { field: 'cariKodu', headerName: 'Cari Kodu', width: 150 },
    {
      field: 'cariAdi',
      headerName: 'Cari Adı',
      width: 350,
      filter: 'agTextColumnFilter',
    },
    { field: 'referans', headerName: 'Referans No', width: 150 },
    {
      field: 'teslimatDurumuString',
      headerName: 'Teslimat Durumu',
      width: 150,
    },
    {
      field: 'teslimTarihi',
      headerName: 'Teslim Tarihi',
      width: 150,
      valueFormatter: (params) =>
        this.DatePipe.transform(params.value, 'dd.MM.yyyy'),
    },
    { field: 'siparisAlanPersonel', headerName: 'Siparis Alan Personel' },
    { field: 'aciklama', headerName: 'Açıklama' },
    { field: 'satirSayisi', headerName: 'Satır S.', width: 80 },
    { field: 'referansNo', headerName: 'Ref. No' },
    {
      field: 'genelToplam',
      headerName: 'Toplam Tutar',
      pinned: 'right',
      cellRenderer: this.CurrencyCellRendererTR,
    },
  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.FaturaService.GetList(() => {})).items;
    this.rowData = this.rowData.filter((c) => c.seri == 'AF');

    this.rowData.forEach((item) => {
      item.faturaHareketler.forEach((siparisHareket) => {
        siparisHareket.satirTutar =
          siparisHareket.miktar * siparisHareket.birimFiyat;
        siparisHareket.iskontoTutar =
          (siparisHareket.satirTutar * siparisHareket.iskonto) / 100;
        siparisHareket.iskontoSonrasiTutar =
          siparisHareket.satirTutar - siparisHareket.iskontoTutar;
        siparisHareket.kdvTutar =
          (siparisHareket.iskontoSonrasiTutar * Number(item.kdv)) / 100;
        siparisHareket.genelToplam =
          siparisHareket.iskontoSonrasiTutar + siparisHareket.kdvTutar;
      });

      item.satirTutar = item.faturaHareketler.reduce(
        (prev: any, next: any) => prev + next.satirTutar,
        0
      );
      item.iskontoTutar = item.faturaHareketler.reduce(
        (prev: any, next: any) => prev + next.iskontoTutar,
        0
      );
      item.iskontoSonrasiTutar = item.faturaHareketler.reduce(
        (prev: any, next: any) => prev + next.iskontoSonrasiTutar,
        0
      );
      item.kdvTutar = item.faturaHareketler.reduce(
        (prev: any, next: any) => prev + next.kdvTutar,
        0
      );
      item.satirOtv = (item.iskontoSonrasiTutar * item.otv) / 100;
      item.genelToplam = item.iskontoSonrasiTutar + item.kdvTutar;
      item.satirSayisi = item.faturaHareketler.length;

      if (item.teslimatDurumu == 0) {
        item.teslimatDurumuString = 'Teslimat Yapılmadı';
      } else {
        item.teslimatDurumuString = 'Teslim Edildi';
      }
    });

  }
  fisCreateButton:boolean=true;
  rowClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedRow = selectedRows;
    
    this.buttonDisabled = false;

    if (this.selectedRow.faturaDurumu) {
      this.fisCreateButton = false;
    }
    else{
      this.fisCreateButton = true;
    }
  }
  rowDblClick() {
    this.updateModal();
  }

  createModal() {
    const modalRef = this.NgbModal.open(CreateAlisFaturaComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Birim Kartı';

    modalRef.result.then(async (item) => {
      if (item) {
        this.refresh();
      }
    });
  }

  updateModal() {
    if (this.selectedRow) {
      const modalRef = this.NgbModal.open(UpdateAlisFaturaComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = this.selectedRow;

      modalRef.result.then(async (item) => {
        if (item == true) {
          this.refresh();
        }
      });
    }
  }

  async refresh() {
    window.location.reload();
  }

  delete() {
    if (this.selectedRow) {
      const modalRef = this.NgbModal.open(DeleteModalComponents, {
        size: 'sm',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = 'Birim Kartı';
      modalRef.result.then((event) => {
        if (event == true) {
          this.FaturaService.delete(this.selectedRow.id, () => {
            this.refresh();
          });
        }
      });
    }
  }
  fisSatirlari: any = [];
  FisOlustur() {

    if (this.selectedRow) {
      const modalRef = this.NgbModal.open(OnayModalComponents, {
        size: 'sm',
        backdrop: 'static',
      });

      modalRef.componentInstance.confirmationMessage =
        'Fiş oluşturmak istediğinize emin misiniz?';

      modalRef.result.then(async (event) => {
        if (event == true) {
          

          const modalFis=this.NgbModal.open(CreateFisFromFaturaComponent,{
            size:"xl",
            backdrop:"static"
          })
          modalFis.componentInstance.data=this.selectedRow;
     
        

       
        }
      });
    }
  }

  filter: boolean = false;
  filtrele() {
    this.filter = !this.filter;
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

function cellClass(params: CellClassParams) {
  if (params.value === 'Onaylandı') {
    return params.value === 'Onaylandı' ? 'rag-green' : 'rag-gray';
  } else if (params.value === 'Reddedildi') {
    return params.value === 'Reddedildi' ? 'rag-red' : 'rag-gray';
  } else {
    return params.value === 'Onay Bekliyor' ? 'rag-gray' : 'rag-gray';
  }
}
