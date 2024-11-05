import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateKasaModel } from 'src/app/core/models/kasa/create-kasa-model';
import { KasaService } from 'src/app/core/services/repository/kasa.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-create-kasa',
  templateUrl: './create-kasa.component.html',
  styleUrls: ['./create-kasa.component.scss']
})
export class CreateKasaComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string; } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private KasaService: KasaService,
    private modalService: NgbModal
  ) {


  }
  ngOnInit(): void {

  }
  colDefs: ColDef[] = [
    { field: "ad" , width: 200, filter: "agTextColumnFilter",},
    { field: "kod" , width: 200, filter: "agTextColumnFilter",},

  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;

  }
  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
  }
  rowDblClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.router.navigate(['/menu/malzeme-yonetimi/birim/detail'],{state:selectedRows})
  }
  public frm: FormGroup = this.fb.group({

    kod: [null, [Validators.required, Validators.maxLength(16)]],
    ad: [null, [Validators.required, Validators.maxLength(16)]],
    hourId: [null, [Validators.required, Validators.maxLength(16)]],

  })
  get kod() { return this.frm.get('kod') }
  get ad() { return this.frm.get('ad') }
  get hourId() { return this.frm.get('hourId') }





  createKasa() {

    const createModel = new CreateKasaModel();
    createModel.ad = this.frm.value.ad;
    createModel.kod = this.frm.value.kod;
    createModel.hourId = String(new Date().valueOf());


    this.KasaService.create(createModel, () => {
      this.router.navigate(['/menu/finans/kasa/detail'], { state: createModel })
    }, errorMessage => { })

  }







  // createKasaHareket() {
  //   const modalRef = this.modalService.open(CreateKasaHareketComponent, { size: 'lg', backdrop: 'static' });
  //   modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
  //   modalRef.result.then((bankaHesap) => {


  //   });
  // }
}
