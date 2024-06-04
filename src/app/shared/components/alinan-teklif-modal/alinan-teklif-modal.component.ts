import { Component, Input, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { VerilenTeklifHareketModalComponent } from '../verilen-teklif-hareket-modal/verilen-teklif-hareket-modal.component';
import { TeklifService } from 'src/app/core/services/repository/teklif.service';

@Component({
  selector: 'app-alinan-teklif-modal',
  templateUrl: './alinan-teklif-modal.component.html',
  styleUrls: ['./alinan-teklif-modal.component.scss'],
  providers: [DatePipe],
})
export class AlinanTeklifModalComponent implements OnInit {
  @Input() confirmationBoxTitle;
  @Input() confirmationMessage;
  @Input() selectedCari: any;


  constructor(
    public activeModal: NgbActiveModal,
    private TeklifService: TeklifService,
    private DatePipe: DatePipe,
    private modalService: NgbModal,) {

  }
  ngOnInit(): void {

    
  }

  rowData: any[];

  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi<any>;

  colDefs: ColDef[] = [
    {
      field: "createdDate",
      headerName: "Hareket Tarihi",
      width: 120,
      valueFormatter: params => this.DatePipe.transform(params.value, ' dd.MM.yyyy'),
      pinned: "left",
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
    },
    { field: "seri", headerName: "Seri", width: 70, },
    { field: "belgeNo", headerName: "Belge No", width: 150, },
    { field: "teklifTuruAdi", headerName: "Türü", width: 80, },
    { field: "kdvTutar", headerName: "Kdv Tutarı", width: 100, cellRenderer: this.CurrencyCellRendererTR },
    { field: "satirOtv", headerName: "ÖTV Tutarı", width: 100, cellRenderer: this.CurrencyCellRendererTR },
    { field: "cariKodu", headerName: "Cari Kodu", width: 150 },
    { field: "cariAdi", headerName: "Cari Adı", width: 350, minWidth: 200 },
    { field: "referans", headerName: "Referans No", width: 150 },
    // { field: "durum", headerName: "Onay Durumu", width: 150 },
    { field: "teklifAlanPersonel", headerName: "Teklif Alan Personel" },
    { field: "opsiyonTarihi", headerName: "Opsiyon Tarihi", width: 150 },
    { field: "aciklama", headerName: "Açıklama" },
    { field: "satirSayisi", headerName: "Satır S.", width: 80 },
    { field: "referansNo", headerName: "Ref. No" },
    { field: "genelToplam", headerName: "Toplam Tutar", width: 130, pinned: "right", cellRenderer: this.CurrencyCellRendererTR },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };
  CurrencyCellRendererTR(params: any) {
    var inrFormat = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    });
    return inrFormat.format(params.value);
  }
  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.TeklifService.GetList(() => { })).items;
    this.rowData = this.rowData.filter(c => c.seri == "AT" && c.cariId == this.selectedCari.cariId && c.durum == "Açık");

    this.rowData.forEach((teklif) => {
      teklif.teklifHareketler.forEach(teklifHareket => {
        teklifHareket.satirTutar = (teklifHareket.miktar * teklifHareket.birimFiyat);
        teklifHareket.iskontoTutar = (teklifHareket.satirTutar * teklifHareket.iskonto) / 100;
        teklifHareket.iskontoSonrasiTutar = (teklifHareket.satirTutar) - teklifHareket.iskontoTutar;
        teklifHareket.kdvTutar = (teklifHareket.iskontoSonrasiTutar) * Number(teklif.kdv) / 100;
        teklifHareket.genelToplam = teklifHareket.iskontoSonrasiTutar + teklifHareket.kdvTutar
      });

      teklif.satirTutar = teklif.teklifHareketler.reduce((prev: any, next: any) => prev + next.satirTutar, 0)
      teklif.iskontoTutar = teklif.teklifHareketler.reduce((prev: any, next: any) => prev + next.iskontoTutar, 0)
      teklif.iskontoSonrasiTutar = teklif.teklifHareketler.reduce((prev: any, next: any) => prev + next.iskontoSonrasiTutar, 0)
      teklif.kdvTutar = teklif.teklifHareketler.reduce((prev: any, next: any) => prev + next.kdvTutar, 0);
      teklif.satirOtv = (teklif.iskontoSonrasiTutar * teklif.otv) / 100;
      teklif.genelToplam = teklif.iskontoSonrasiTutar + teklif.kdvTutar;
      teklif.satirSayisi = teklif.teklifHareketler.length
    })
  }
  selectedRows: any;


  onSelectionChanged() {
    this.selectedRows = this.gridApi.getSelectedRows();


  }

  Teklifs: any[] = [];
  close() {


    // this.activeModal.close(this.selectedRow)

  }
  selectedTeklifHareketler: any;
  ileri() {
    if (this.selectedRows.length > 0) {
      const modalRef = this.modalService.open(VerilenTeklifHareketModalComponent, { size: 'lg', backdrop: 'static' },);
      modalRef.componentInstance.confirmationBoxTitle = 'Arama : Teklif Hareketler';
      modalRef.componentInstance.selectedTeklifs = this.selectedRows;
      modalRef.result.then((teklifHareket) => {
        this.selectedTeklifHareketler = teklifHareket;
        this.activeModal.close(this.selectedTeklifHareketler)
      });
    }

  }


}

