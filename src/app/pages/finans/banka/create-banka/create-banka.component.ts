import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateBankaModel } from 'src/app/core/models/banka/create-banka-model';
import { BankaService } from 'src/app/core/services/repository/banka.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StokSelectModalComponent } from 'src/app/shared/components/stok-select-modal/stok-select-modal.component';
import { CreateBankaHesapModalComponent } from '../create-banka-hesap-modal/create-banka-hesap-modal.component';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
@Component({
  selector: 'app-create-banka',
  templateUrl: './create-banka.component.html',
  styleUrls: ['./create-banka.component.scss']
})
export class CreateBankaComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;

  constructor(private fb: FormBuilder, private router: Router, private BankaService: BankaService,    public activeModal: NgbActiveModal,
    private NgbModal: NgbModal) {


  }
  ngOnInit(): void {

  }


  colDefs: ColDef[] = [
    { field: "hesapNo", headerName: "Hesap No", width: 100, },
    { field: "hesapAdi", headerName: "Hesap Adı", width: 150 },
    { field: "hesapTuruAdi", headerName: "Hesap Türü", width: 350, },
  ];



  public frm: FormGroup = this.fb.group({
    kod: [null, [Validators.required, Validators.maxLength(16)]],
    ad: [null, [Validators.required, Validators.maxLength(16)]],
    aciklama: [null, [Validators.required, Validators.maxLength(16)]],

  })
  get kod() { return this.frm.get('kod') }
  get ad() { return this.frm.get('ad') }
  get aciklama() { return this.frm.get('aciklama') }



































  Kaydet() {
    const createModel = new CreateBankaModel();
    createModel.ad = this.frm.value.ad;
    createModel.kod = this.frm.value.kod;
    createModel.hourId = String(new Date().valueOf());
    createModel.aciklama =this.frm.value.aciklama;
    createModel.bankaHesaplar = this.getAllRowData();



  
    this.BankaService.create(createModel, () => {
      this.activeModal.close(true)
    }, errorMessage => {

    })
  }
  getAllRowData() {
    let rowData = [];
    this.gridApi.forEachNode(node => rowData.push(node.data));
    return rowData;
  }
  cikis() {
    this.activeModal.close(false);
  }

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = [];
  }
  rowClick(event) {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedRow = selectedRows;
    this.buttonDisabled=false
  }

  Ekle() {
    const modalRef = this.NgbModal.open(CreateBankaHesapModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
    modalRef.result.then((bankaHesap) => {

      if (bankaHesap != false) {
        this.gridApi.applyTransaction({ add: [bankaHesap], addIndex: this.gridApi.getLastDisplayedRow() + 1 })
      }
    });
  }

  deleteRowData() {
    this.gridApi.applyTransaction({ remove: [this.selectedRow] });
  }

}
