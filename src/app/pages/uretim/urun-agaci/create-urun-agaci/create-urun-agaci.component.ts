import { Component, OnInit } from '@angular/core';
import { CreateUrunAgaciModel } from '../core/models/create-urun-agaci-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrunAgaciService } from '../core/services/urun-agaci.service';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StokSelectModalComponent } from '../components/stok-select-modal/stok-select-modal.component';
import { StokAddRowModalComponent } from '../components/stok-add-row-modal/stok-add-row-modal.component';
import { UrunAgaciSelectModalComponent } from '../components/urun-agaci-select-modal/urun-agaci-select-modal.component';
@Component({
  selector: 'app-create-urun-agaci',
  templateUrl: './create-urun-agaci.component.html',
  styleUrls: ['./create-urun-agaci.component.scss']
})
export class CreateUrunAgaciComponent implements OnInit {

  selectedParent: any;
  selectedStok: any;
  StokDataSource: any[];
  UrunAgaciDataSource: any[];
  rowData: any[];
  frameworkComponents: any;
  GetCode: any;
  urunAgaciAdi: any;
  urunAgaciKodu: any;
  rowSelectedBilesen: any;
  deleteDisabled: boolean = false
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;

  constructor(
    private fb: FormBuilder,
    private UrunAgaciService: UrunAgaciService,
    private StokService: StokService,
    private modalService: NgbModal
  ) {

  }
  async ngOnInit() {
    this.GetListUrunAgaci();
    this.GetListStok();
    this.GetCode = (await this.UrunAgaciService.GetCode()).kod;
  }
  colDefs: ColDef[] = [
    { field: "stokKodu", width: 150 },
    { field: "stokAdi", width: 600 },
    { field: "miktar", editable: true },
    { field: "birimAdi" },


  ];

  public frm: FormGroup = this.fb.group({
    parentId: [null, [Validators.required, Validators.maxLength(16)]],
    stokId: [null, [Validators.required, Validators.maxLength(16)]],
    ad: [null, [Validators.required, Validators.maxLength(16)]],
    kod: [null, [Validators.required, Validators.maxLength(16)]],
    urunGrubu: [null, [Validators.required, Validators.maxLength(16)]],

  });
  get parentId() { return this.frm.get('parentId') }
  get stokId() { return this.frm.get('stokId') }
  get ad() { return this.frm.get('ad') }
  get kod() { return this.frm.get('kod') }
  get urunGrubu() { return this.frm.get('urunGrubu') }



  kaydet() {

    const model = new CreateUrunAgaciModel();


    if (this.selectedParent) {
      this.getAllRowData().forEach((item) => {

        model.ad = item.stokAdi;
        model.kod = this.frm.value.kod;
        model.stokId = item.stokId;
        model.parentId = this.selectedParent?.id ? this.selectedParent?.id : "00000000-0000-0000-0000-000000000000";
        model.urunGrubu = "Kabin";
        model.tip = null;
        model.miktar = 1;
        model.aciklama = "";
        model.durum = "";
        model.urunAgaciBilesenler = [];


        this.UrunAgaciService.create(model, () => {
          window.location.reload()
        }, errorMessage => { })


      })


    }
    else {
      model.ad = this.selectedStok?.ad;
      model.kod = this.frm.value.kod;
      model.miktar = 1;
      model.aciklama = "";
      model.durum = true;
      model.stokId = this.selectedStok?.id ? this.selectedStok?.id : this.selectedParent?.id;
      model.parentId = this.selectedParent?.id ? this.selectedParent?.id : "00000000-0000-0000-0000-000000000000";
      model.urunGrubu = "Kabin";
      model.tip = null;
      model.durum = null;
      model.urunAgaciBilesenler = [];


      this.UrunAgaciService.create(model, () => {
        window.location.reload()
      }, errorMessage => { })


    }




  }
  async GetListUrunAgaci() {
    this.UrunAgaciDataSource = (await this.UrunAgaciService.GetList(() => { })).items;
  }
  async GetListStok() {
    this.StokDataSource = (await this.StokService.GetList(() => { })).items;
  }




  getAllRowData() {
    let rowData = [];
    this.gridApi.forEachNode(node => rowData.push(node.data));
    return rowData;
  }
  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;

  }

  rowSelected() {
    this.rowSelectedBilesen = this.gridApi.getSelectedRows()[0];
  }
  urunAgaciBilesenDelete() {

    this.gridApi.applyTransaction({ remove: [this.rowSelectedBilesen] });

    if (this.getAllRowData().length==0) {
      this.deleteDisabled = false
    }
    return this.rowData;
  }


  stokAddRowModal() {
    const modalRef = this.modalService.open(StokAddRowModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
    modalRef.result.then((stoks) => {

      if (stoks != false) {
        stoks.forEach(stok => {
          this.gridApi.applyTransaction({ add: [stok], addIndex: this.gridApi.getLastDisplayedRow() + 1 })
          this.deleteDisabled = true
        });

      }
    });
  }

  parentSelectModal() {

    const modalRef = this.modalService.open(UrunAgaciSelectModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
    modalRef.result.then((urunAgaci) => {

      if (urunAgaci != false) {
        this.selectedParent = urunAgaci;
        this.urunAgaciAdi = this.selectedParent.ad;
      }



      this.selectedStok = this.StokDataSource.find((el: any) => {

        return el?.id == urunAgaci.stokId;
      });



    });



  }
  stokSelectModal() {

    const modalRef = this.modalService.open(StokSelectModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
    modalRef.result.then((stok) => {
      this.selectedStok = stok;
      this.urunAgaciAdi = this.selectedStok.ad
      this.selectedParent = null
    });

  }





  changedParent(event) {
    this.selectedParent = event;
    this.urunAgaciAdi = this.selectedParent?.ad;
    if (this.selectedParent == null) {
      this.urunAgaciAdi = this.selectedStok?.ad
    }
  }




}
