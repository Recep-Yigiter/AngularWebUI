import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe, DatePipe, formatDate } from '@angular/common';
import { FaturaService } from 'src/app/core/services/repository/fatura.service';
import { FaturaHareketService } from 'src/app/core/services/repository/fatura-hareket.service';
import { DeleteButtonComponent } from 'src/app/shared/components/delete-button/delete-button.component';
import { UpdateFaturaModel } from 'src/app/core/models/faturalar/update-fatura.model';
import { StokSelectModalComponent } from 'src/app/shared/components/stok-select-modal/stok-select-modal.component';
import { DepoSelectModalComponent } from 'src/app/shared/components/depo-select-modal/depo-select-modal.component';
import { CariSelectModalComponent } from 'src/app/shared/components/cari-select-modal/cari-select-modal.component';
import { DepoService } from 'src/app/core/services/repository/depo.service';


@Component({
  selector: 'app-update-satis-fatura',
  templateUrl: './update-satis-fatura.component.html',
  styleUrls: ['./update-satis-fatura.component.scss'],
  providers: [CurrencyPipe, DatePipe],
})
export class UpdateSatisFaturaComponent implements OnInit {
  defaultAciklama: any;
  stateData: any;
  defaultKDV: any = 0;
  defaultOTV: any = 0;



  kdvTutar: any;
  iskontoSonrasiTutar: any;
  iskontoTutar: any;
  satirTutar: any;
  genelToplam: any;
  selectedFaturaHareket: any;
  belgeNoGetCode: any;
  dateTime: any = new Date();
  time: any = new Date();
  rxTime: any = new Date();
  selectedDepo: any
  selectedCari: any
  rowData: any;
  frameworkComponents: any;
  selectedFaturaTuru: any
  getByIdDataSource: any;
  selectedObject: any;
  stokHareket: any;
  fatura: any;
  private gridApi!: GridApi<any>;
  public rowSelection: "single" | "multiple" = "single";




  constructor(private router: Router,
    private FaturaService: FaturaService,
    private DatePipe: DatePipe,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private FaturaHareketService: FaturaHareketService,
    private DepoService: DepoService
  ) {
    this.stateData = history.state
    this.frameworkComponents = {
      buttonRenderer: DeleteButtonComponent,
    }
  }

  ngOnInit(): void {
    this.stateControl();
    this.getDateAndTime()


  }

  public frm: FormGroup = this.fb.group({
    faturaTuru: [null, [Validators.required, Validators.maxLength(16)]],
    seri: [null, [Validators.required, Validators.maxLength(16)]],
    belgeNo: [null, [Validators.required, Validators.maxLength(16)]],
    referans: [null, [Validators.required, Validators.maxLength(16)]],
    kdv: [null, [Validators.required, Validators.maxLength(16)]],
    otv: [null, [Validators.required, Validators.maxLength(16)]],
    eFatura: [null, [Validators.required, Validators.maxLength(16)]],
    eArsiv: [null, [Validators.required, Validators.maxLength(16)]],
    cariId: [null,],
    depoId: [null,],
    aciklama: [null,],
    tarih: [null,],
    saat: [null,],
  })
  get faturaTuru() { return this.frm.get('faturaTuru') }
  get seri() { return this.frm.get('seri') }
  get belgeNo() { return this.frm.get('belgeNo') }
  get referans() { return this.frm.get('referans') }
  get kdv() { return this.frm.get('kdv') }
  get otv() { return this.frm.get('otv') }
  get eFatura() { return this.frm.get('eFatura') }
  get eArsiv() { return this.frm.get('eArsiv') }
  get cariId() { return this.frm.get('cariId') }
  get depoId() { return this.frm.get('depoId') }
  get aciklama() { return this.frm.get('aciklama') }
  get tarih() { return this.frm.get('tarih') }
  get saat() { return this.frm.get('saat') }






  colDefs: ColDef[] = [
    { field: "faturaHareketTuruAdi", headerName: "S/H/M", width: 100, onCellValueChanged: (event) => { }, },
    { field: "stokKodu", headerName: "Stok Kodu", width: 150 },
    { field: "stokAdi", headerName: "Stok Adı", width: 350, onCellValueChanged: (event) => { }, },
    { field: "miktar", editable: true, width: 90, type: 'rightAligned', onCellValueChanged: (event) => { this.FaturaHareketUpdate(event) }, valueFormatter: params => params.data.miktar.toFixed(2) },
    { field: "birimAdi", headerName: "Birim", type: 'rightAligned', width: 80, onCellValueChanged: (event) => { }, },
    { field: "birimFiyat", editable: true, width: 100, type: 'rightAligned', onCellValueChanged: (event) => { this.FaturaHareketUpdate(event) }, cellRenderer: this.CurrencyCellRendererTR },
    { field: "iskonto", editable: true, headerName: "isk.(%)", type: 'rightAligned', width: 80, onCellValueChanged: (event) => { this.FaturaHareketUpdate(event) }, valueFormatter: params => params.data.iskonto.toFixed(2) + ' %' },
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


    this.fatura = (await this.FaturaService.getByHourId(this.stateData.hourId, () => { }));
    const depoList = (await this.DepoService.GetList(() => { })).items;

    if (this.stateData.depoId != undefined) {
      this.selectedObject = depoList.find((el: any) => {
        return el?.id == this.stateData.depoId;
      });
    }
    this.fatura.depoAdi = this.selectedObject.ad;
    this.fatura.depoKodu = this.selectedObject.kod;
    this.fatura.depoId = this.selectedObject.id;
    this.fatura.satirSayisi = this.fatura.faturaHareketler.length;
    this.fatura.faturaHareketler.forEach((faturaHareket, index) => {
      faturaHareket.satirTutar = (faturaHareket.miktar * faturaHareket.birimFiyat);
      faturaHareket.iskontoTutar = (faturaHareket.satirTutar * faturaHareket.iskonto) / 100;
      faturaHareket.iskontoSonrasiTutar = (faturaHareket.satirTutar) - faturaHareket.iskontoTutar;
      faturaHareket.kdvTutar = (faturaHareket.iskontoSonrasiTutar) * Number(this.fatura.kdv) / 100;
      faturaHareket.genelToplam = faturaHareket.iskontoSonrasiTutar + faturaHareket.kdvTutar

    })
    this.fatura.satirTutar = this.fatura.faturaHareketler.reduce((prev: any, next: any) => prev + next.satirTutar, 0)
    this.fatura.iskontoTutar = this.fatura.faturaHareketler.reduce((prev: any, next: any) => prev + next.iskontoTutar, 0)
    this.fatura.iskontoSonrasiTutar = this.fatura.faturaHareketler.reduce((prev: any, next: any) => prev + next.iskontoSonrasiTutar, 0)
    this.fatura.kdvTutar = this.fatura.faturaHareketler.reduce((prev: any, next: any) => prev + next.kdvTutar, 0);
    this.fatura.satirOtv = (this.fatura.iskontoSonrasiTutar * this.fatura.otv) / 100;
    this.fatura.genelToplam = this.fatura.iskontoSonrasiTutar + this.fatura.kdvTutar

    this.rowData = this.fatura.faturaHareketler;

    this.stateData = this.fatura;
    this.dateTime = this.DatePipe.transform(this.stateData.createdDate, 'yyyy-MM-dd');
    this.time = this.DatePipe.transform(this.stateData.createdDate, 'hh : mm')









  }



  kaydet() {
    const createModel = new UpdateFaturaModel();
    createModel.id = this.stateData.id;
    createModel.belgeNo = this.frm.value.belgeNo ? this.frm.value.belgeNo : this.stateData.belgeNo;
    createModel.faturaTuru = this.selectedObject?.faturaTuru ? this.selectedObject?.faturaTuru : this.stateData.faturaTuru;
    createModel.seri = this.selectedObject?.seri ? this.selectedObject?.seri : this.stateData.seri;
    createModel.referans = this.frm.value.referans;
    createModel.cariId = this.selectedCari?.id ? this.selectedCari?.id : this.stateData.cariId;
    createModel.depoId = this.selectedDepo?.id ? this.selectedDepo?.id : this.stateData.depoId;
    createModel.kdv = this.frm.value.kdv;
    createModel.otv = this.frm.value.otv;
    createModel.eFatura = this.frm.value.eFatura ? 'e-Fatura olacak' : null;
    createModel.eArsiv = this.frm.value.eArsiv ? 'e-Arşiv olacak' : null;
    createModel.aciklama = this.frm.value.aciklama;
    createModel.hourId = this.stateData.hourId;
    createModel.faturaHareketler = this.getAllRowData()
    createModel.faturaHareketler.forEach((element) => {
      element.depoId = this.selectedDepo?.id ? this.selectedDepo?.id : this.stateData.depoId
    })



    if (this.getAllRowData().length > 0) {
      this.FaturaService.update(createModel, () => {
        this.router.navigate(['/menu/fatura/satis-fatura/detail'], { state: createModel })
      }, errorMessage => { })
    } else {
      alert('Faturaya Satır Eklemelisiniz !')
    }


  }


  vazgec() {
    this.stateData.faturaHareketler = this.getAllRowData()
    this.router.navigate(['/menu/fatura/satis-fatura/list'], { state: this.stateData })
  }


  async FaturaHareketUpdate(event) {

    const faturaHareket = (await this.FaturaHareketService.getByHourId(event.data.hourId, () => { }));
    const editdata = {
      id: faturaHareket.id,
      stokId: faturaHareket.stokId,
      faturaId: faturaHareket.faturaId,
      depoId: this.selectedDepo?.id ? this.selectedDepo?.id : this.stateData.depoId,
      birimFiyat: event.data.birimFiyat,
      miktar: event.data.miktar,
      iskonto: event.data.iskonto,
      faturaHareketTuru: 1,
      hourId: faturaHareket.hourId
    }

    this.FaturaHareketService.update(editdata, () => { })


  }
  FaturaHareketDelete(params) {

    this.gridApi.applyTransaction({ remove: [this.selectedFaturaHareket] });

    this.FaturaHareketService.delete(this.selectedFaturaHareket.id, () => { })

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
            faturaId: this.stateData.id,
            depoId: this.stateData.depoId,
            birimFiyat: stok.birimFiyat,
            miktar: stok.miktar,
            iskonto: stok.iskonto,
            faturaHareketTuru: 1,
            hourId: String(new Date().valueOf())
          }
          stok.hourId = updateData.hourId;
          this.FaturaHareketService.create(updateData, () => { });
          this.gridApi.applyTransaction({ add: [stok], addIndex: this.gridApi.getLastDisplayedRow() + 1 })

        });

      }
    });

  }

  depoSelectModal() {
    const modalRef = this.modalService.open(DepoSelectModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
    modalRef.result.then((depo) => {
      this.selectedDepo = depo;

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
      this.selectedFaturaHareket = selectedRows
      this.gridApi.applyTransaction({ update: [selectedRows], addIndex: this.gridApi.getLastDisplayedRow() + 1 })
    }

  }
  rowSelected(event) {
    this.selectedFaturaHareket = event.data
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
