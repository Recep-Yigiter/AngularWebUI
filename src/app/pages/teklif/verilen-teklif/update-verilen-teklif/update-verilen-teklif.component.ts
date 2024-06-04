import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CurrencyPipe, DatePipe, formatDate } from '@angular/common';

import { TeklifService } from 'src/app/core/services/repository/teklif.service';
import { TeklifHareketService } from 'src/app/core/services/repository/teklif-hareket.service';
import { UpdateTeklifModel } from 'src/app/core/models/teklifler/update-teklif-model';
import { StokSelectModalComponent } from 'src/app/shared/components/stok-select-modal/stok-select-modal.component';
import { CariSelectModalComponent } from 'src/app/shared/components/cari-select-modal/cari-select-modal.component';
import { DepoService } from 'src/app/core/services/repository/depo.service';

@Component({
  selector: 'app-update-verilen-teklif',
  templateUrl: './update-verilen-teklif.component.html',
  styleUrls: ['./update-verilen-teklif.component.scss'],
  providers: [CurrencyPipe, DatePipe],
})
export class UpdateVerilenTeklifComponent implements OnInit {
  defaultAciklama: any;
  stateData: any;
  defaultKDV: any = 0;
  defaultOTV: any = 0;



  kdvTutar: any;
  iskontoSonrasiTutar: any;
  iskontoTutar: any;
  satirTutar: any;
  genelToplam: any;
  selectedTeklifHareket: any;
  belgeNoGetCode: any;
  dateTime: any = new Date();
  dateTimeOpsiyon: any = new Date();
  time: any = new Date();
  rxTime: any = new Date();
  selectedDepo: any
  selectedCari: any
  rowData: any;
  frameworkComponents: any;
  selectedTeklifTuru: any
  getByIdDataSource: any;
  selectedObject: any;
  stokHareket: any;
  teklif: any;
  private gridApi!: GridApi<any>;
  public rowSelection: "single" | "multiple" = "single";




  constructor(private router: Router,
    private TeklifService: TeklifService,
    private DatePipe: DatePipe,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private TeklifHareketService: TeklifHareketService,
    private DepoService: DepoService
  ) {
    this.stateData = history.state
    
  }

  ngOnInit(): void {
    this.stateControl();
    this.getDateAndTime()


  }

  public frm: FormGroup = this.fb.group({
    teklifTuru: [null, [Validators.required, Validators.maxLength(16)]],
    seri: [null, [Validators.required, Validators.maxLength(16)]],
    belgeNo: [null, [Validators.required, Validators.maxLength(16)]],
    referans: [null, [Validators.required, Validators.maxLength(16)]],
    kdv: [null, [Validators.required, Validators.maxLength(16)]],
    otv: [null, [Validators.required, Validators.maxLength(16)]],
    eTeklif: [null, [Validators.required, Validators.maxLength(16)]],
    eArsiv: [null, [Validators.required, Validators.maxLength(16)]],
    cariId: [null,],
    depoId: [null,],
    aciklama: [null,],
    tarih: [null,],
    saat: [null,],
    opsiyonTarihi: [null,],
  })
  get teklifTuru() { return this.frm.get('teklifTuru') }
  get seri() { return this.frm.get('seri') }
  get belgeNo() { return this.frm.get('belgeNo') }
  get referans() { return this.frm.get('referans') }
  get kdv() { return this.frm.get('kdv') }
  get otv() { return this.frm.get('otv') }
  get eTeklif() { return this.frm.get('eTeklif') }
  get eArsiv() { return this.frm.get('eArsiv') }
  get cariId() { return this.frm.get('cariId') }
  get depoId() { return this.frm.get('depoId') }
  get aciklama() { return this.frm.get('aciklama') }
  get tarih() { return this.frm.get('tarih') }
  get saat() { return this.frm.get('saat') }
  get opsiyonTarihi() { return this.frm.get('opsiyonTarihi') }






  colDefs: ColDef[] = [
    { field: "teklifHareketTuruAdi", headerName: "S/H/M", width: 100, onCellValueChanged: (event) => { }, },
    { field: "stokKodu", headerName: "Stok Kodu", width: 150 },
    { field: "stokAdi", headerName: "Stok Adı", width: 350, onCellValueChanged: (event) => { }, },
    { field: "miktar", editable: true, width: 90, type: 'rightAligned', onCellValueChanged: (event) => { this.TeklifHareketUpdate(event) }, valueFormatter: params => params.data.miktar.toFixed(2) },
    { field: "birimAdi", headerName: "Birim", type: 'rightAligned', width: 80, onCellValueChanged: (event) => { }, },
    { field: "birimFiyat", editable: true, width: 100, type: 'rightAligned', onCellValueChanged: (event) => { this.TeklifHareketUpdate(event) }, cellRenderer: this.CurrencyCellRendererTR },
    { field: "iskonto", editable: true, headerName: "isk.(%)", type: 'rightAligned', width: 80, onCellValueChanged: (event) => { this.TeklifHareketUpdate(event) }, valueFormatter: params => params.data.iskonto.toFixed(2) + ' %' },
    { field: "iskontoTutar", type: 'rightAligned', headerName: "isk. Tutarı", onCellValueChanged: (event) => { }, width: 120, cellRenderer: this.CurrencyCellRendererTR },
    { field: "aciklama", headerName: "Açıklama", onCellValueChanged: (event) => { }, width: 200, },
    { field: "satirTutar", type: 'rightAligned', width: 120, headerName: "Toplam Tutar", onCellValueChanged: (event) => { }, cellRenderer: this.CurrencyCellRendererTR },



  ];






  CurrencyCellRendererTR(params: any) {
    var inrFormat = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    });
    return inrFormat.format(params.value);
  }

  async stateControl() {


    this.teklif = (await this.TeklifService.getByHourId(this.stateData.hourId, () => { }));
    const depoList = (await this.DepoService.GetList(() => { })).items;

    if (this.stateData.depoId != undefined) {
      this.selectedObject = depoList.find((el: any) => {
        return el?.id == this.stateData.depoId;
      });
    }

    this.teklif.satirSayisi = this.teklif.teklifHareketler.length;
    this.teklif.teklifHareketler.forEach((teklifHareket, index) => {
      teklifHareket.satirTutar = (teklifHareket.miktar * teklifHareket.birimFiyat);
      teklifHareket.iskontoTutar = (teklifHareket.satirTutar * teklifHareket.iskonto) / 100;
      teklifHareket.iskontoSonrasiTutar = (teklifHareket.satirTutar) - teklifHareket.iskontoTutar;
      teklifHareket.kdvTutar = (teklifHareket.iskontoSonrasiTutar) * Number(this.teklif.kdv) / 100;
      teklifHareket.genelToplam = teklifHareket.iskontoSonrasiTutar + teklifHareket.kdvTutar

    })
    this.teklif.satirTutar = this.teklif.teklifHareketler.reduce((prev: any, next: any) => prev + next.satirTutar, 0)
    this.teklif.iskontoTutar = this.teklif.teklifHareketler.reduce((prev: any, next: any) => prev + next.iskontoTutar, 0)
    this.teklif.iskontoSonrasiTutar = this.teklif.teklifHareketler.reduce((prev: any, next: any) => prev + next.iskontoSonrasiTutar, 0)
    this.teklif.kdvTutar = this.teklif.teklifHareketler.reduce((prev: any, next: any) => prev + next.kdvTutar, 0);
    this.teklif.satirOtv = (this.teklif.iskontoSonrasiTutar * this.teklif.otv) / 100;
    this.teklif.genelToplam = this.teklif.iskontoSonrasiTutar + this.teklif.kdvTutar

    this.rowData = this.teklif.teklifHareketler;

    this.stateData = this.teklif;
    this.dateTime = this.DatePipe.transform(this.stateData.createdDate, 'yyyy-MM-dd');
    this.time = this.DatePipe.transform(this.stateData.createdDate, 'hh : mm')









  }



  kaydet() {
    const createModel = new UpdateTeklifModel();
    createModel.id = this.stateData.id;
    createModel.belgeNo = this.frm.value.belgeNo ? this.frm.value.belgeNo : this.stateData.belgeNo;
    createModel.teklifTuru = this.selectedObject?.teklifTuru ? this.selectedObject?.teklifTuru : this.stateData.teklifTuru;
    createModel.seri = this.selectedObject?.seri ? this.selectedObject?.seri : this.stateData.seri;
    createModel.durum = this.stateData.durum;
    createModel.referans = this.frm.value.referans;
    createModel.cariId = this.selectedCari?.id ? this.selectedCari?.id : this.stateData.cariId;
    createModel.kdv = this.frm.value.kdv;
    createModel.otv = this.frm.value.otv;
    createModel.aciklama = this.frm.value.aciklama;
    createModel.hourId = this.stateData.hourId;
    createModel.opsiyonTarihi = this.stateData.opsiyonTarihi;
    createModel.teklifHareketler = this.getAllRowData()




    if (this.getAllRowData().length > 0) {
      this.TeklifService.update(createModel, () => {
        this.router.navigate(['/satis/verilen-teklif/detail'], { state: createModel })
      }, errorMessage => { })
    } else {
      alert('Teklif e Satır Eklemelisiniz !')
    }


  }



  vazgec() {
    this.stateData.TeklifHareketler = this.getAllRowData()
    this.router.navigate(['/satis/verilen-teklif'], { state: this.stateData })
  }


  async TeklifHareketUpdate(event) {

    const TeklifHareket = (await this.TeklifHareketService.getByHourId(event.data.hourId, () => { }));
    const editdata = {
      id: TeklifHareket.id,
      stokId: TeklifHareket.stokId,
      teklifId: TeklifHareket.teklifId,
      depoId: this.selectedDepo?.id ? this.selectedDepo?.id : this.stateData.depoId,
      birimFiyat: event.data.birimFiyat,
      miktar: event.data.miktar,
      iskonto: event.data.iskonto,
      teklifHareketTuru: 1,
      hourId: TeklifHareket.hourId
    }

    this.TeklifHareketService.update(editdata, () => { })


  }
  TeklifHareketDelete(params) {

    this.gridApi.applyTransaction({ remove: [this.selectedTeklifHareket] });

    this.TeklifHareketService.delete(this.selectedTeklifHareket.id, () => { })

    this.onCellValueChanged()
    return this.rowData;
  }





  stokSelectModal() {
    const modalRef = this.modalService.open(StokSelectModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
    modalRef.result.then((stoks) => {

      if (stoks != false) {
        stoks.forEach(stok => {
          stok.satirTutar = stok.miktar * stok.birimFiyat;
          const updateData = {
            stokId: stok.stokId,
            teklifId: this.stateData.id,
            depoId: this.stateData.depoId,
            birimFiyat: stok.birimFiyat,
            miktar: stok.miktar,
            iskonto: stok.iskonto,
            teklifHareketTuru: 1,
            hourId: String(new Date().valueOf())
          }
          stok.hourId = updateData.hourId;
          this.TeklifHareketService.create(updateData, () => { });
          this.gridApi.applyTransaction({ add: [stok], addIndex: this.gridApi.getLastDisplayedRow() + 1 })

        });

      }
    });

  }



  cariSelectModal() {
    const modalRef = this.modalService.open(CariSelectModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
    modalRef.result.then((depo) => {
      this.selectedCari = depo;

    });

  }



  getAllRowData() {
    let rowData = [];
    this.gridApi.forEachNode(node => rowData.push(node.data));
    return rowData;
  }
  onCellValueChanged() {


    this.getAllRowData().forEach((item) => {
      item.toplamTutar = (item.miktar * item.birimFiyat);
      item.iskontoTutar = (item.miktar * item.birimFiyat) * item.iskonto / 100;
      item.satirTutar = item.miktar * item.birimFiyat;

    })



    this.satirTutar = this.getAllRowData().reduce((prev: any, next: any) => prev + next.toplamTutar, 0);
    this.iskontoTutar = this.getAllRowData().reduce((prev: any, next: any) => prev + next.iskontoTutar, 0)
    this.kdvTutar = this.getAllRowData().reduce((prev: any, next: any) => prev + next.kdvTutar, 0)
    this.iskontoSonrasiTutar = this.satirTutar - this.iskontoTutar
    this.genelToplam = this.iskontoSonrasiTutar + this.kdvTutar;

    const selectedRows = this.gridApi.getSelectedRows()[0];
    if (selectedRows != undefined) {
      this.selectedTeklifHareket = selectedRows
      this.gridApi.applyTransaction({ update: [selectedRows], addIndex: this.gridApi.getLastDisplayedRow() + 1 })
    }

  }
  rowSelected(event) {
    this.selectedTeklifHareket = event.data
  }
  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
  }




  kdvChanced() { 
    this.onCellValueChanged()
  }
  otvChanced() {
    this.onCellValueChanged()
  }
  



  getDateAndTime() {
    this.dateTime = this.DatePipe.transform(this.stateData.createdDate, 'yyyy-MM-dd');
    this.dateTimeOpsiyon = this.DatePipe.transform(this.stateData.opsiyonTarihi, 'yyyy-MM-dd');
    this.time = this.DatePipe.transform(this.stateData.createdDate, 'hh : mm')
  }

}


function currencyFormatter(currency, sign) {

  var sansDec = currency.toFixed(2);
  var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return sign + `${formatted}`;
}
function stringFormatter(params) {
  var fruit = params.value;
  var firstChar = fruit.slice(0, 1).toUpperCase();
  return firstChar + fruit.slice(1);
}
