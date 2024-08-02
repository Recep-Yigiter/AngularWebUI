import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateBankaModel } from 'src/app/core/models/banka/create-banka-model';
import { BankaService } from 'src/app/core/services/repository/banka.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StokSelectModalComponent } from 'src/app/shared/components/stok-select-modal/stok-select-modal.component';
import { CreateBankaHesapModalComponent } from '../create-banka-hesap-modal/create-banka-hesap-modal.component';
@Component({
  selector: 'app-create-banka',
  templateUrl: './create-banka.component.html',
  styleUrls: ['./create-banka.component.scss']
})
export class CreateBankaComponent implements OnInit {
  rowData: any = [];
  private gridApi!: GridApi<any>;
  public rowSelection: "single" | "multiple" = "single";
  selectedBankaHesap: any;

  constructor(private fb: FormBuilder, private router: Router, private BankaService: BankaService, private modalService: NgbModal) {


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





  createBanka() {
    const createModel = new CreateBankaModel();
    createModel.ad = this.frm.value.ad;
    createModel.kod = this.frm.value.kod;
    createModel.hourId = String(new Date().valueOf());
    createModel.aciklama = "";
    createModel.bankaHesaplar = this.getAllRowData();



  
    this.BankaService.create(createModel, () => {
      this.router.navigate(['/menu/finans/banka/detail'], { state: createModel })
    }, errorMessage => {

    })



  }
  createBankaHesap() {
    const modalRef = this.modalService.open(CreateBankaHesapModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
    modalRef.result.then((bankaHesap) => {

      if (bankaHesap != false) {
        this.gridApi.applyTransaction({ add: [bankaHesap], addIndex: this.gridApi.getLastDisplayedRow() + 1 })
      }
    });
  }

  rowSelected(event) {
    this.selectedBankaHesap = event.data
  }

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
  }




  getAllRowData() {
    let rowData = [];
    this.gridApi.forEachNode(node => rowData.push(node.data));
    return rowData;
  }



}
