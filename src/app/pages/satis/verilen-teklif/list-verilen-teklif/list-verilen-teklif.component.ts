import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, CellClassParams, ISelectCellEditorParams, } from 'ag-grid-community';
import { Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { TeklifService } from 'src/app/core/services/repository/teklif.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VerilenTeklifModalComponent } from 'src/app/shared/components/verilen-teklif-modal/verilen-teklif-modal.component';
import { AlinanTeklifModalComponent } from 'src/app/shared/components/alinan-teklif-modal/alinan-teklif-modal.component';
import { AlinanTeklifHareketModalComponent } from 'src/app/shared/components/alinan-teklif-hareket-modal/alinan-teklif-hareket-modal.component';
import { CreateSiparisModel } from 'src/app/core/models/siparisler/create-siparis-model';
import { SiparisService } from 'src/app/core/services/repository/siparis.service';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import * as resize from '../../../../../assets/js/resizable-layout';

@Component({
  selector: 'app-list-verilen-teklif',
  templateUrl: './list-verilen-teklif.component.html',
  styleUrls: ['./list-verilen-teklif.component.scss'],
  providers: [DatePipe],
})
export class ListVerilenTeklifComponent implements OnInit {

  rowData: any[];

  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string; } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  colDefs: ColDef[] = [
    { field: "onay", headerName: "Onay Durumu", width: 130, pinned: "left", cellClass: cellClass, },
    { field: "createdDate", headerName: "Hareket Tarihi", width: 120, valueFormatter: params => this.DatePipe.transform(params.value, 'dd.MM.yyyy'), pinned: "left" },
    { field: "seri", headerName: "Seri", width: 70, pinned: "left" },
    { field: "belgeNo", headerName: "Belge No", width: 150, pinned: "left" },
    { field: "teklifTuruAdi", headerName: "Türü", width: 80, pinned: "left" },
    { field: "durum", headerName: "Durum", width: 80 },
    { field: "kdvTutar", headerName: "Kdv Tutarı", width: 100, cellRenderer: this.CurrencyCellRendererTR },
    { field: "satirOtv", headerName: "ÖTV Tutarı", width: 100, cellRenderer: this.CurrencyCellRendererTR },
    { field: "cariKodu", headerName: "Cari Kodu", width: 150 },
    { field: "cariAdi", headerName: "Cari Adı", width: 350 },
    { field: "referans", headerName: "Referans No", width: 150 },
    { field: "teklifAlanPersonel", headerName: "Teklif Alan Personel" },
    { field: "opsiyonTarihi", headerName: "Opsiyon Tarihi", width: 150, valueFormatter: params => this.DatePipe.transform(params.value, 'dd.MM.yyyy') },
    { field: "aciklama", headerName: "Açıklama" },
    { field: "satirSayisi", headerName: "Satır S.", width: 80 },
    { field: "referansNo", headerName: "Ref. No" },
    { field: "genelToplam", headerName: "Toplam Tutar", pinned: "right", cellRenderer: this.CurrencyCellRendererTR },
  ];

  onDelete() {
    resize.resizeFunction();
  }
  frameworkComponents: any;
  constructor(
    private TeklifService: TeklifService,
    private modalService: NgbModal, private router: Router,
    private DatePipe: DatePipe,
    private SiparisService: SiparisService
  ) {


  }
  ngOnInit(): void {
    this.belgeNoGetKod();
  }

  CurrencyCellRendererTR(params: any) {
    var inrFormat = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    });
    return inrFormat.format(params.value);
  }
  rowDataCount: any;
  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.TeklifService.GetList(() => { })).items;
    this.rowData = this.rowData.filter(c => c.seri == "VT")

    this.rowData.forEach((rowData) => {
      if (rowData.durum == "Kapalı") {
        rowData.onayDurumu = "Siparişe Aktarıldı"
      } else {
        rowData.onayDurumu = "Beklemede"
      }
      const dateParts = rowData.createdDate.split("/");
      return {
        ...rowData,
        createdDate: `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`,
        dateObject: new Date(
          parseInt(dateParts[2]),
          parseInt(dateParts[1]) - 1,
          parseInt(dateParts[0]),
        ),

      }
    })

    this.rowDataCount = this.rowData.length;


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


  filterSideMenu() {
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
    this.onBtAdd()
  }

  getAllRowData() {
    let rowData = [];
    this.gridApi.forEachNode(node => rowData.push(node.data));

    return rowData;
  }

  satirTutar: any;
  iskontoTutar: any;
  iskontoSonrasiTutar: any;
  kdvTutar: any;
  satirOtv: any;
  genelToplam: any;
  selectedTeklifHareketRowClick: any;
  selectedTeklifHareketDblClick: any;
  onCellValueChanged() {
    this.getAllRowData().forEach((item) => {
      item.toplamTutar = (item.miktar * item.birimFiyat);
      item.iskontoTutar = (item.miktar * item.birimFiyat) * item.iskonto / 100;
      item.satirTutar = item.miktar * item.birimFiyat;
      item.kdvTutar = (item.toplamTutar - item.iskontoTutar) * item.kdv / 100;
    })
    this.satirTutar = this.getAllRowData().reduce((prev: any, next: any) => prev + next.satirTutar, 0);
    this.iskontoTutar = this.getAllRowData().reduce((prev: any, next: any) => prev + next.iskontoTutar, 0)
    this.kdvTutar = this.getAllRowData().reduce((prev: any, next: any) => prev + next.kdvTutar, 0)
    this.iskontoSonrasiTutar = this.satirTutar - this.iskontoTutar
    this.genelToplam = this.iskontoSonrasiTutar + this.kdvTutar;

    const selectedRows = this.gridApi.getSelectedRows()[0];

    if (selectedRows != undefined) {
      this.selectedTeklifHareketDblClick = selectedRows
      this.gridApi.applyTransaction({ update: [selectedRows], addIndex: this.gridApi.getLastDisplayedRow() + 1 })

    }
  }

  onSelectionChanged() {

    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedTeklifHareketRowClick = selectedRows;
    this.disabledActionButton = true;

  }

  rowDblClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedTeklifHareketDblClick = selectedRows
    this.router.navigate(['/menu/satis/verilen-teklif/detail'], { state: selectedRows })
  }

  onBtAdd() {
    var selectedRows = this.gridApi.getSelectedNodes();

    this.gridApi.applyTransaction({ add: [{ ad: "Aaaaaaaaaaa" + Date.now() }], addIndex: this.gridApi.getLastDisplayedRow() + 1 })
  }










  selectedTeklifHareketlerModal: any;
  disabledActionButton: boolean = false;
  belgeNoGetCode: any;
  defaultAciklama: any;

  async belgeNoGetKod() {
    this.belgeNoGetCode = (await this.TeklifService.GetCode()).kod;
    this.defaultAciklama = 'VS' + "-" + this.belgeNoGetCode + " no lu Verilen Sipariş"
  }
  alinanTeklifModal() {

    const modalRef = this.modalService.open(AlinanTeklifHareketModalComponent, { size: 'xl', backdrop: 'static', });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Teklifler';
    modalRef.componentInstance.selectedRow = this.selectedTeklifHareketRowClick;
    modalRef.result.then((teklifHareketler) => {

      if (teklifHareketler != false) {
        this.selectedTeklifHareketlerModal = teklifHareketler;
        this.selectedTeklifHareketRowClick.teklifHareketler = this.selectedTeklifHareketlerModal


        const createModel = new CreateSiparisModel();
        createModel.belgeNo = this.belgeNoGetCode;
        createModel.siparisTuru = 1;
        createModel.seri = "AS";
        createModel.referans = this.selectedTeklifHareketRowClick.referans;
        createModel.cariId = this.selectedTeklifHareketRowClick.cariId;
        createModel.kdv = this.selectedTeklifHareketRowClick.kdv;
        createModel.otv = this.selectedTeklifHareketRowClick.otv;
        createModel.aciklama = this.defaultAciklama;
        createModel.teslimTarihi = this.selectedTeklifHareketRowClick.opsiyonTarihi;
        createModel.hourId = String(new Date().valueOf());

        this.selectedTeklifHareketRowClick.teklifHareketler.forEach(element => {
          element.siparisHareketTuru = element.teklifHareketTuru;
        });

        createModel.siparisHareketler = this.selectedTeklifHareketRowClick.teklifHareketler;



        this.SiparisService.create(createModel, () => {


          this.selectedTeklifHareketRowClick.durum = "Kapalı";
          this.TeklifService.update(this.selectedTeklifHareketRowClick, () => { }, errorMessage => { })











        })






      }




    });

  }












}


function currencyFormatter(currency, sign) {
  var sansDec = currency.toFixed(0);
  var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return sign + `${formatted}`;
}
function stringFormatter(params) {
  var fruit = params.value;
  var firstChar = fruit.slice(0, 1).toUpperCase();
  return firstChar + fruit.slice(1);
}

function cellClass(params: CellClassParams) {


  if (params.value === "Onaylandı") {
    return params.value === "Onaylandı" ? "rag-green" : "rag-gray"
  }
  else if (params.value === "Reddedildi") {
    return params.value === "Reddedildi" ? "rag-red" : "rag-gray"
  }
  else {
    return params.value === "Onay Bekliyor" ? "rag-gray" : "rag-gray"
  }

}