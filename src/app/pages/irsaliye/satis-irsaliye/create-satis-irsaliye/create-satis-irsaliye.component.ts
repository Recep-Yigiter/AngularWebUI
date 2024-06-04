import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CurrencyPipe, DatePipe, formatDate } from '@angular/common';
import { IrsaliyeService } from 'src/app/core/services/repository/irsaliye.service';
import { CreateIrsaliyeModel } from 'src/app/core/models/irsaliyeler/create-irsaliye.model';
import { StokSelectModalComponent } from 'src/app/shared/components/stok-select-modal/stok-select-modal.component';
import { DepoSelectModalComponent } from 'src/app/shared/components/depo-select-modal/depo-select-modal.component';
import { CariSelectModalComponent } from 'src/app/shared/components/cari-select-modal/cari-select-modal.component';

@Component({
  selector: 'app-create-satis-irsaliye',
  templateUrl: './create-satis-irsaliye.component.html',
  styleUrls: ['./create-satis-irsaliye.component.scss'],
  providers: [CurrencyPipe, DatePipe],
})
export class CreateSatisIrsaliyeComponent {

  defaultAciklama: any;
  kdvTutar: any;
  iskontoSonrasiTutar: any;
  iskontoTutar: any;
  satirTutar: any;
  genelToplam: any;
  selectedIrsaliyeHareket: any;
  belgeNoGetCode: any;
  dateTime: any = new Date();
  time: any = new Date();
  rxTime: any = new Date();
  selectedDepo: any
  selectedCari: any
  rowData: any;
  frameworkComponents: any;
  defaultKDV: any = 0;
  defaultOTV: any = 0;
  selectedIrsaliyeTuru: any
  IrsaliyeTuruAdi:any='Satış';
  seriNo:any='SI';
  private gridApi!: GridApi<any>;
  public rowSelection: "single" | "multiple" = "single";



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private IrsaliyeService: IrsaliyeService,
    private modalService: NgbModal,
    private DatePipe: DatePipe
  ) { }

  async ngOnInit() {
    this.belgeNoGetKod()
    this.getDateAndTime()



  }

  public frm: FormGroup = this.fb.group({



    IrsaliyeTuru: [null, [Validators.required, Validators.maxLength(16)]],
    seri: [null, [Validators.required, Validators.maxLength(16)]],
    belgeNo: [null, [Validators.required, Validators.maxLength(16)]],
    referans: [null, [Validators.required, Validators.maxLength(16)]],
    kdv: [null, [Validators.required, Validators.maxLength(16)]],
    otv: [null, [Validators.required, Validators.maxLength(16)]],
    eIrsaliye: [null, [Validators.required, Validators.maxLength(16)]],
    eArsiv: [null, [Validators.required, Validators.maxLength(16)]],
    cariId: [null,],
    depoId: [null,],
    aciklama: [null,],
    tarih: [null,],
    saat: [null,],


  })
  get IrsaliyeTuru() { return this.frm.get('IrsaliyeTuru') }
  get seri() { return this.frm.get('seri') }
  get belgeNo() { return this.frm.get('belgeNo') }
  get referans() { return this.frm.get('referans') }
  get kdv() { return this.frm.get('kdv') }
  get otv() { return this.frm.get('otv') }
  get eIrsaliye() { return this.frm.get('eIrsaliye') }
  get eArsiv() { return this.frm.get('eArsiv') }
  get cariId() { return this.frm.get('cariId') }
  get depoId() { return this.frm.get('depoId') }
  get aciklama() { return this.frm.get('aciklama') }
  get tarih() { return this.frm.get('tarih') }
  get saat() { return this.frm.get('saat') }




  colDefs: ColDef[] = [
    { field: "stokAdi", width: 600, },
    { field: "miktar", editable: true, valueFormatter: params => params.data.miktar.toFixed(2) },
    { field: "birimAdi", },
    { field: "birimFiyat", editable: true, valueFormatter: params => currencyFormatter(params.data.birimFiyat, "₺ "),},
    { field: "iskonto", headerName: "isk.(%)", width: 80, editable: true, valueFormatter: params => params.data.iskonto.toFixed(2) + ' %' },
    { field: "iskontoTutar", headerName: "isk. Tutarı", width: 120, cellRenderer: this.CurrencyCellRendererTR, },
    { field: "satirTutar", cellRenderer: this.CurrencyCellRendererTR, },

  ];


  IrsaliyeTurler: any[] = [
    { ad: "Alış Irsaliyesi", IrsaliyeTuru: 1, seri: "AI" },
    { ad: "Satış Irsaliyesi", IrsaliyeTuru: 2, seri: "SI" },
  ];




  kaydet() {
    const createModel = new CreateIrsaliyeModel();
    createModel.belgeNo = this.frm.value.belgeNo;
    createModel.irsaliyeTuru = 2;
    createModel.seri = "SI";
    createModel.referans = this.frm.value.referans;
    createModel.cariId = this.selectedCari.id;
    createModel.depoId = this.selectedDepo.id;
    createModel.kdv = String(this.frm.value.kdv);
    createModel.otv = String(this.frm.value.otv);
    createModel.eIrsaliye = this.frm.value.eIrsaliye ? 'e-Irsaliye olacak' : null;
    createModel.eArsiv = this.frm.value.eArsiv ? 'e-Arşiv olacak' : null;
    createModel.aciklama = this.frm.value.aciklama;
    createModel.hourId = String(new Date().valueOf());
    createModel.irsaliyeHareketler = this.getAllRowData()


    if (this.getAllRowData().length > 0) {
      
      this.IrsaliyeService.create(createModel, () => {
        this.router.navigate(['/irsaliye/satis-irsaliyesi/detail'], { state: createModel })
      }, errorMessage => { })

    } else {
      alert('Irsaliyeya Satır Eklemelisiniz !')
    }

  }

  kaydet_yeni() {
    const createModel = new CreateIrsaliyeModel();
    createModel.belgeNo = this.frm.value.belgeNo;
    createModel.irsaliyeTuru = 2;
    createModel.seri = "SI";
    createModel.referans = this.frm.value.referans;
    createModel.cariId = this.selectedCari.id;
    createModel.depoId = this.selectedDepo.id;
    createModel.kdv = String(this.frm.value.kdv);
    createModel.otv = String(this.frm.value.otv);
    createModel.eIrsaliye = this.frm.value.eIrsaliye ? 'e-Irsaliye olacak' : null;
    createModel.eArsiv = this.frm.value.eArsiv ? 'e-Arşiv olacak' : null;
    createModel.aciklama = this.frm.value.aciklama;
    createModel.hourId = String(new Date().valueOf());
    createModel.irsaliyeHareketler = this.getAllRowData()


    if (this.getAllRowData().length > 0) {
      this.IrsaliyeService.create(createModel, () => {
        window.location.reload();
      }, errorMessage => { })
    } else {
      alert('Irsaliyeye Satır Eklemelisiniz !')
    }
  }

  vazgec() {
    this.router.navigate(['/irsaliye/satis-irsaliyesi'])
  }

  IrsaliyeHareketDelete(params) {

    this.gridApi.applyTransaction({ remove: [this.selectedIrsaliyeHareket] });
    this.onCellValueChanged()
    return this.rowData;
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
      item.kdvTutar = (item.toplamTutar - item.iskontoTutar) * this.frm.value.kdv / 100;
    })
    this.satirTutar = this.getAllRowData().reduce((prev: any, next: any) => prev + next.satirTutar, 0);
    this.iskontoTutar = this.getAllRowData().reduce((prev: any, next: any) => prev + next.iskontoTutar, 0)
    this.kdvTutar = this.getAllRowData().reduce((prev: any, next: any) => prev + next.kdvTutar, 0)
    this.iskontoSonrasiTutar = this.satirTutar - this.iskontoTutar
    this.genelToplam = this.iskontoSonrasiTutar + this.kdvTutar;

    const selectedRows = this.gridApi.getSelectedRows()[0];

    if (selectedRows != undefined) {
      this.selectedIrsaliyeHareket = selectedRows
      this.gridApi.applyTransaction({ update: [selectedRows], addIndex: this.gridApi.getLastDisplayedRow() + 1 })

    }
  }

  rowSelected(event) {
    this.selectedIrsaliyeHareket = event.data
  }

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
  }












  stokSelectModal() {
    const modalRef = this.modalService.open(StokSelectModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
    modalRef.result.then((stoks) => {

      if (stoks != false) {
        stoks.forEach(stok => {
          stok.toplamTutar = stok.miktar * stok.birimFiyat;
          stok.hourId = String(new Date().valueOf())
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




  kdvChanced() {
    this.onCellValueChanged()
  }
  otvChanced() {
    this.onCellValueChanged()
  }
  changed(event) {
    this.selectedIrsaliyeTuru = event;
    this.defaultAciklama = this.selectedIrsaliyeTuru?.seri + "-" + this.frm.value.belgeNo + " no lu Alış Irsaliyesi"

  }


  async belgeNoGetKod() {
    this.belgeNoGetCode = (await this.IrsaliyeService.GetCode()).items.kod;
  }
  getDateAndTime() {
    this.dateTime = this.DatePipe.transform(this.dateTime, 'yyyy-MM-dd');

    this.time = this.DatePipe.transform(this.time, 'hh:mm a');
    const date = new Date();
    let hour = this.rxTime.getHours();
    let minuts = this.rxTime.getMinutes();
    let NewTime = ("0" + hour).slice(-2) + ":" + ("0" + minuts).slice(-2);
    this.time = NewTime
  }







  CurrencyCellRendererTR(params: any) {
    var inrFormat = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    });
    return inrFormat.format(params.value);
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
