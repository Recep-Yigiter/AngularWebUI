import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { TeklifService } from 'src/app/core/services/repository/teklif.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { SiparisService } from 'src/app/core/services/repository/siparis.service';
import { CreateSiparisModel } from 'src/app/core/models/siparisler/create-siparis-model';
import { UpdateTeklifModel } from 'src/app/core/models/teklifler/update-teklif-model';
import { DepoService } from 'src/app/core/services/repository/depo.service';

@Component({
  selector: 'app-detail-alinan-teklif',
  templateUrl: './detail-alinan-teklif.component.html',
  styleUrls: ['./detail-alinan-teklif.component.scss'],
  providers: [DatePipe],
})
export class DetailAlinanTeklifComponent implements OnInit {
  /**
   *
   */
  stateData: any;
  constructor(private router: Router, private SiparisService: SiparisService, private modalService: NgbModal, private TeklifService: TeklifService, private DatePipe: DatePipe, private DepoService: DepoService) {
    this.stateData = history.state

  }
  dateTime: any = new Date();
  dateTimeOpsiyon: any = new Date();

  time: any = new Date();
  rxTime: any = new Date();
  ngOnInit(): void {
    this.stateControl();

  }

  getAllRowData() {
    let rowData = [];
    this.gridApi.forEachNode(node => rowData.push(node.data));

    return rowData;
  }

  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  frameworkComponents: any;
  rowData: any[];

  colDefs: ColDef[] = [
    { field: "teklifHareketTuruAdi", headerName: "S/H/M", width: 100, },
    { field: "stokKodu", headerName: "Stok Kodu", width: 150 },
    { field: "stokAdi", headerName: "Stok Adı", width: 350, },
    { field: "miktar", width: 90, type: 'rightAligned', cellRenderer: this.CurrencyCellRendererTR },
    { field: "birimAdi", headerName: "Birim", type: 'rightAligned', width: 80, },
    { field: "birimFiyat", width: 100, type: 'rightAligned', cellRenderer: this.CurrencyCellRendererTR },
    { field: "iskonto", headerName: "isk.(%)", type: 'rightAligned', width: 80, valueFormatter: params => params.data.iskonto.toFixed(2) + ' %' },
    { field: "iskontoTutar", type: 'rightAligned', headerName: "isk. Tutarı", width: 120, cellRenderer: this.CurrencyCellRendererTR },
    { field: "aciklama", headerName: "Açıklama", width: 200, },
    { field: "satirTutar", type: 'rightAligned', width: 120, headerName: "Toplam Tutar", cellRenderer: this.CurrencyCellRendererTR },



  ];

  CurrencyCellRendererTR(params: any) {
    var inrFormat = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    });
    return inrFormat.format(params.value);
  }

  teklif: any;
  selectedObject: any;
  teklifAktarbuttonDisable: boolean = false;
  async stateControl() {


    this.teklif = (await this.TeklifService.getByHourId(this.stateData.hourId, () => { }));


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
    this.dateTime = this.DatePipe.transform(this.teklif.createdDate, 'yyyy-MM-dd');
    this.dateTimeOpsiyon = this.DatePipe.transform(this.teklif.opsiyonTarihi, 'yyyy-MM-dd');
    this.time = this.DatePipe.transform(this.teklif.createdDate, 'hh : mm ');
    this.onaySelect = this.stateData.onay
    if (this.stateData.durum == 'Kapalı' || this.stateData.onay != "Onaylandı") {
      this.teklifAktarbuttonDisable = true;
    }
  }
  vazgec() {

    this.router.navigate(['/satinalma/alinan-teklif'], { state: this.stateData })

  }
  async duzenle() {

    if (this.stateData?.id) {
      this.router.navigate(['/satinalma/alinan-teklif/update'], { state: this.stateData })
    }
    else {
      this.teklif = (await this.TeklifService.getByHourId(this.stateData.hourId, () => { }))

      this.router.navigate(['/satinalma/alinan-teklif/update'], { state: this.teklif })
    }
  }

  selectedOnayOption: any;
  onayOptions: any = [
    "Onay Bekliyor",
    "Onaylandı",
    "Reddedildi",
  ]
  changed(event) {
    this.selectedOnayOption = event
    // if (this.onayOptions != undefined) {
    //   this.selectedObject = this.onayOptions.find((el: any) => {
    //     return el?.id == this.selectedOnayOption;
    //   });
    // }
  }
  onaySelect: any;
  onChangeOnay(event) {
    this.editing = true
    this.selectedOnayOption = event

  }



  durumOnayButton: boolean;
  verilenSiparisDonustur() {

    const modalRef = this.modalService.open(ConfirmModalComponent, { size: 'sm', backdrop: 'static' });
    modalRef.componentInstance.confirmationBoxTitle = ' Dikkat !';
    modalRef.result.then((onay) => {

      if (onay) {

        const createModel = new CreateSiparisModel();
        createModel.belgeNo = this.stateData.belgeNo;
        createModel.siparisTuru = 2;
        createModel.seri = "VS";
        createModel.referans = this.stateData.referans;
        createModel.cariId = this.stateData.cariId;
        createModel.kdv = this.stateData.kdv;
        createModel.otv = this.stateData.otv;
        createModel.aciklama = this.stateData.aciklama;
        createModel.teslimTarihi = this.stateData.opsiyonTarihi;
        createModel.hourId = String(new Date().valueOf());

        this.stateData.teklifHareketler.forEach(element => {
          element.siparisHareketTuru = element.teklifHareketTuru;
        });

        createModel.siparisHareketler = this.stateData.teklifHareketler



        this.SiparisService.create(createModel, () => {
          const createModel = new UpdateTeklifModel();
          createModel.id = this.stateData.id;
          createModel.belgeNo = this.stateData.belgeNo;
          createModel.teklifTuru = this.stateData.teklifTuru;
          createModel.seri = this.stateData.seri;
          createModel.durum = "Kapalı";
          createModel.onay = "Onaylandı";
          createModel.referans = this.stateData.referans;
          createModel.cariId = this.stateData.cariId;
          createModel.kdv = this.stateData.kdv;
          createModel.otv = this.stateData.otv;
          createModel.aciklama = this.stateData.aciklama;
          createModel.hourId = this.stateData.hourId;
          createModel.opsiyonTarihi = this.stateData.opsiyonTarihi;
          createModel.teklifHareketler = this.stateData.teklifHareketler

          this.TeklifService.update(createModel, () => {
            this.durumOnayButton = false;
            this.teklifAktarbuttonDisable = true;
          }, errorMessage => { })

        }, errorMessage => { })



      }

    });








  }


  editing: any = false;

  onRowEditSave() {

    const createModel = new UpdateTeklifModel();
    createModel.id = this.stateData.id;
    createModel.belgeNo = this.stateData.belgeNo;
    createModel.teklifTuru = this.stateData.teklifTuru;
    createModel.seri = this.stateData.seri;
    createModel.onay = this.selectedOnayOption;
    createModel.referans = this.stateData.referans;
    createModel.cariId = this.stateData.cariId;
    createModel.kdv = this.stateData.kdv;
    createModel.otv = this.stateData.otv;
    createModel.aciklama = this.stateData.aciklama;
    createModel.hourId = this.stateData.hourId;
    createModel.opsiyonTarihi = this.stateData.opsiyonTarihi;
    createModel.teklifHareketler = this.stateData.teklifHareketler;
    createModel.durum = this.stateData.durum


    if (createModel.onay != "Onaylandı") {
      this.teklifAktarbuttonDisable = true
    }



    this.TeklifService.update(createModel, async () => {
      this.durumOnayButton = false;
      this.editing = false;


      var teklif = (await this.TeklifService.getByHourId(this.stateData.hourId, () => { }))

      if (teklif.durum == "Açık" && teklif.onay == "Onaylandı") {
        this.teklifAktarbuttonDisable = false
      }


    }, errorMessage => { })




  }

  async onRowEditCancel() {

    this.onaySelect = (await this.TeklifService.getByHourId(this.stateData.hourId, () => { })).onay;
    this.editing = false;
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
