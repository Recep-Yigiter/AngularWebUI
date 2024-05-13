import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CurrencyPipe, DatePipe, formatDate } from '@angular/common';

import { DepoService } from 'src/app/pages/stok/depo/core/services/depo.service';
import { SiparisService } from 'src/app/core/services/repository/siparis.service';
import { SiparisHareketService } from 'src/app/core/services/repository/siparis-hareket.service';
import { UpdateSiparisModel } from 'src/app/core/models/siparisler/update-siparis-model';
import { StokSelectModalComponent } from 'src/app/shared/components/stok-select-modal/stok-select-modal.component';
import { CariSelectModalComponent } from 'src/app/shared/components/cari-select-modal/cari-select-modal.component';


@Component({
  selector: 'app-update-verilen-siparis',
  templateUrl: './update-verilen-siparis.component.html',
  styleUrls: ['./update-verilen-siparis.component.scss'],
  providers: [CurrencyPipe, DatePipe],
})
export class UpdateVerilenSiparisComponent implements OnInit {
  defaultAciklama: any;
  stateData: any;
  defaultKDV: any = 0;
  defaultOTV: any = 0;



  kdvTutar: any;
  iskontoSonrasiTutar: any;
  iskontoTutar: any;
  satirTutar: any;
  genelToplam: any;
  selectedSiparisHareket: any;
  belgeNoGetCode: any;
  dateTime: any = new Date();
  dateTimeTeslimTarihi: any = new Date();
  time: any = new Date();
  rxTime: any = new Date();
  selectedDepo: any
  selectedCari: any
  rowData: any;
  frameworkComponents: any;
  selectedSiparisTuru: any
  getByIdDataSource: any;
  selectedObject: any;
  stokHareket: any;
  siparis: any;
  private gridApi!: GridApi<any>;
  public rowSelection: "single" | "multiple" = "single";




  constructor(private router: Router,
    private SiparisService: SiparisService,
    private DatePipe: DatePipe,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private SiparisHareketService: SiparisHareketService,
    private DepoService: DepoService
  ) {
    this.stateData = history.state
    
  }

  ngOnInit(): void {
    this.stateControl();
    this.getDateAndTime()


  }

  public frm: FormGroup = this.fb.group({
    siparisTuru: [null, [Validators.required, Validators.maxLength(16)]],
    seri: [null, [Validators.required, Validators.maxLength(16)]],
    belgeNo: [null, [Validators.required, Validators.maxLength(16)]],
    referans: [null, [Validators.required, Validators.maxLength(16)]],
    kdv: [null, [Validators.required, Validators.maxLength(16)]],
    otv: [null, [Validators.required, Validators.maxLength(16)]],
    teslimTarihi: [null,],
    cariId: [null,],
    depoId: [null,],
    aciklama: [null,],
    tarih: [null,],
    saat: [null,],
  })
  get siparisTuru() { return this.frm.get('siparisTuru') }
  get seri() { return this.frm.get('seri') }
  get belgeNo() { return this.frm.get('belgeNo') }
  get referans() { return this.frm.get('referans') }
  get kdv() { return this.frm.get('kdv') }
  get otv() { return this.frm.get('otv') }
  get cariId() { return this.frm.get('cariId') }
  get depoId() { return this.frm.get('depoId') }
  get aciklama() { return this.frm.get('aciklama') }
  get tarih() { return this.frm.get('tarih') }
  get saat() { return this.frm.get('saat') }
  get teslimTarihi() { return this.frm.get('teslimTarihi') }






  colDefs: ColDef[] = [
    { field: "siparisHareketTuruAdi", headerName: "S/H/M", width: 80, onCellValueChanged: (event) => { }, },
    { field: "stokKodu", headerName: "Stok Kodu", width: 150 },
    { field: "stokAdi", headerName: "Stok Adı", width: 350, onCellValueChanged: (event) => { }, },
    { field: "miktar", editable: true, width: 90, type: 'rightAligned', onCellValueChanged: (event) => { this.SiparisHareketUpdate(event) }, valueFormatter: params => params.data.miktar.toFixed(2) },
    { field: "birimAdi", headerName: "Birim", type: 'rightAligned', width: 80, onCellValueChanged: (event) => { }, },
    { field: "birimFiyat", editable: true, width: 100, type: 'rightAligned', onCellValueChanged: (event) => { this.SiparisHareketUpdate(event) }, cellRenderer: this.CurrencyCellRendererTR },
    { field: "iskonto", editable: true, headerName: "isk.(%)", type: 'rightAligned', width: 80, onCellValueChanged: (event) => { this.SiparisHareketUpdate(event) }, valueFormatter: params => params.data.iskonto.toFixed(2) + ' %' },
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

    this.siparis = (await this.SiparisService.getByHourId(this.stateData.hourId, () => { })).data;
    const depoList = (await this.DepoService.GetList(() => { })).data.items;

    if (this.stateData.depoId != undefined) {
      this.selectedObject = depoList.find((el: any) => {
        return el?.id == this.stateData.depoId;
      });
    }

    this.siparis.satirSayisi = this.siparis.siparisHareketler.length;
    this.siparis.siparisHareketler.forEach((siparisHareket, index) => {
     siparisHareket.satirTutar = (siparisHareket.miktar * siparisHareket.birimFiyat);
     siparisHareket.iskontoTutar = (siparisHareket.satirTutar * siparisHareket.iskonto) / 100;
     siparisHareket.iskontoSonrasiTutar = (siparisHareket.satirTutar) - siparisHareket.iskontoTutar;
     siparisHareket.kdvTutar = (siparisHareket.iskontoSonrasiTutar) * Number(this.siparis.kdv) / 100;
     siparisHareket.genelToplam = siparisHareket.iskontoSonrasiTutar + siparisHareket.kdvTutar

    })
    this.siparis.satirTutar = this.siparis.siparisHareketler.reduce((prev: any, next: any) => prev + next.satirTutar, 0)
    this.siparis.iskontoTutar = this.siparis.siparisHareketler.reduce((prev: any, next: any) => prev + next.iskontoTutar, 0)
    this.siparis.iskontoSonrasiTutar = this.siparis.siparisHareketler.reduce((prev: any, next: any) => prev + next.iskontoSonrasiTutar, 0)
    this.siparis.kdvTutar = this.siparis.siparisHareketler.reduce((prev: any, next: any) => prev + next.kdvTutar, 0);
    this.siparis.satirOtv = (this.siparis.iskontoSonrasiTutar * this.siparis.otv) / 100;
    this.siparis.genelToplam = this.siparis.iskontoSonrasiTutar + this.siparis.kdvTutar

    this.rowData = this.siparis.siparisHareketler;

    this.stateData = this.siparis;
    this.dateTime = this.DatePipe.transform(this.stateData.createdDate, 'yyyy-MM-dd');
    this.time = this.DatePipe.transform(this.stateData.createdDate, 'hh : mm')









  }



  kaydet() {
    const createModel = new UpdateSiparisModel();
    createModel.id = this.stateData.id;
    createModel.belgeNo = this.frm.value.belgeNo ? this.frm.value.belgeNo : this.stateData.belgeNo;
    createModel.siparisTuru = this.selectedObject?.siparisTuru ? this.selectedObject?.siparisTuru : this.stateData.siparisTuru;
    createModel.seri = this.selectedObject?.seri ? this.selectedObject?.seri : this.stateData.seri;
    createModel.referans = this.frm.value.referans;
    createModel.cariId = this.selectedCari?.id ? this.selectedCari?.id : this.stateData.cariId;
    createModel.kdv = this.frm.value.kdv;
    createModel.otv = this.frm.value.otv;
    createModel.aciklama = this.frm.value.aciklama;
    createModel.teslimTarihi = this.frm.value.teslimTarihi;
    createModel.hourId = this.stateData.hourId;
    createModel.siparisHareketler = this.getAllRowData()




    if (this.getAllRowData().length > 0) {
      this.SiparisService.update(createModel, () => {
        this.router.navigate(['/pages/siparis/detail-verilen-siparis'], { state: createModel })
      }, errorMessage => { })
    } else {
      alert('Siparis e Satır Eklemelisiniz !')
    }


  }

  kaydet_yeni() {
    const createModel = new UpdateSiparisModel();
    createModel.id = this.stateData.id;
    createModel.belgeNo = this.frm.value.belgeNo ? this.frm.value.belgeNo : this.stateData.belgeNo;
    createModel.siparisTuru = this.selectedObject?.siparisTuru ? this.selectedObject?.siparisTuru : this.stateData.siparisTuru;
    createModel.seri = this.selectedObject?.seri ? this.selectedObject?.seri : this.stateData.seri;
    createModel.referans = this.frm.value.referans;
    createModel.cariId = this.selectedCari?.id ? this.selectedCari?.id : this.stateData.cariId;
    createModel.kdv = this.frm.value.kdv;
    createModel.otv = this.frm.value.otv;
    createModel.aciklama = this.frm.value.aciklama;
    createModel.teslimTarihi = this.frm.value.teslimTarihi;
    createModel.hourId = this.stateData.hourId;
    createModel.siparisHareketler = this.getAllRowData()




    if (this.getAllRowData().length > 0) {
      this.SiparisService.update(createModel, () => {
        this.router.navigate(['/pages/siparis/update-verilen-siparis'])
      }, errorMessage => { })
    } else {
      alert('Siparis e Satır Eklemelisiniz !')
    }
  }

  vazgec() {
    this.stateData.SiparisHareketler = this.getAllRowData()
    this.router.navigate(['/pages/siparis/verilen-siparis'], { state: this.stateData })
  }


  async SiparisHareketUpdate(event) {

    const SiparisHareket = (await this.SiparisHareketService.getByHourId(event.data.hourId, () => { })).data;
    const editdata = {
      id: SiparisHareket.id,
      stokId: SiparisHareket.stokId,
      siparisId: SiparisHareket.siparisId,
      depoId: this.selectedDepo?.id ? this.selectedDepo?.id : this.stateData.depoId,
      birimFiyat: event.data.birimFiyat,
      miktar: event.data.miktar,
      iskonto: event.data.iskonto,
      siparisHareketTuru: 1,
      hourId: SiparisHareket.hourId
    }

    this.SiparisHareketService.update(editdata, () => { })


  }
  SiparisHareketDelete(params) {

    this.gridApi.applyTransaction({ remove: [this.selectedSiparisHareket] });

    this.SiparisHareketService.delete(this.selectedSiparisHareket.id, () => { })

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
            siparisId: this.stateData.id,
            depoId: this.stateData.depoId,
            birimFiyat: stok.birimFiyat,
            miktar: stok.miktar,
            iskonto: stok.iskonto,
            SiparisHareketTuru: 1,
            hourId: String(new Date().valueOf())
          }
          stok.hourId = updateData.hourId;
          this.SiparisHareketService.create(updateData, () => { });
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
      this.selectedSiparisHareket = selectedRows
      this.gridApi.applyTransaction({ update: [selectedRows], addIndex: this.gridApi.getLastDisplayedRow() + 1 })
    }

  }
  rowSelected(event) {
    this.selectedSiparisHareket = event.data
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
    this.dateTimeTeslimTarihi = this.DatePipe.transform(this.stateData.teslimTarihi, 'yyyy-MM-dd');
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
