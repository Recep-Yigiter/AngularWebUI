import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from 'src/app/core/services/api-client.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StokSelectModalComponent } from '../components/stok-select-modal/stok-select-modal.component';
import { DeleteButtonComponent } from '../components/delete-button/delete-button.component';
import { StokService } from 'src/app/pages/stok/stok/core/services/stok.service';
import { CreateUrunReceteModel } from '../core/models/create-urun-recete-model';
import { UrunReceteService } from '../core/services/urun-recete.service';
import { OperasyonSelectModalComponent } from '../components/operasyon-select-modal/operasyon-select-modal.component';
@Component({
  selector: 'app-create-urun-recete',
  templateUrl: './create-urun-recete.component.html',
  styleUrls: ['./create-urun-recete.component.scss']
})
export class CreateUrunReceteComponent implements OnInit {

  BirimDataSource: any[]
  selectedStok: any;
  selectedOption: any;
  StokDataSource: any[];
  defaultBirimFiyat = 0;
  rowData: any[];
  rowData2: any[];

  frameworkComponents: any;
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;

  private gridApiOperasyonlar!: GridApi<any>;
 
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private StokService: StokService,
    private UrunReceteService: UrunReceteService
  ) {
    this.frameworkComponents = {
      buttonRenderer: DeleteButtonComponent,
    }

  }
  ngOnInit() {
    this.getAllStok();



  }


  public frm: FormGroup = this.fb.group({

    miktar: [null, [Validators.required, Validators.maxLength(16)]],
    stokId: [null, [Validators.required, Validators.maxLength(16)]],
    referans: [null, [Validators.required, Validators.maxLength(16)]],
    boMTuru: [null, [Validators.required, Validators.maxLength(16)]],
    hourId: [null]

  })

  get miktar() { return this.frm.get('miktar') }
  get stokId() { return this.frm.get('stokId') }
  get referans() { return this.frm.get('referans') }
  get boMTuru() { return this.frm.get('boMTuru') }


  colDefs: ColDef[] = [
    { field: "stokAdi", width: 600 },
    { field: "miktar", editable: true },
    { field: "birimAdi" },
    {
      field: "", width: 50,
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onDelete.bind(this),
        label: 'Click 1'
      }
    },

  ];
  colDefs2: ColDef[] = [
    { field: "ad", width: 600, editable: true },
    { field: "isMerkeziAdi", },
    { field: "isMerkeziKodu" },
    {
      field: "", width: 50,
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onDeleteOperasyon.bind(this),
        label: 'Click 1'
      }
    },

  ];



  create() {
    const createModel = new CreateUrunReceteModel();
    createModel.stokAdi = this.selectedStok.ad;
    createModel.stokId = this.frm.value.stokId.id;
    createModel.miktar = Number(this.frm.value.miktar);
    createModel.referans = this.frm.value.referans;
    createModel.boMTuru = this.frm.value.boMTuru;
    createModel.hourId = String(new Date().valueOf());
    createModel.urunReceteBilesenler = this.getAllRowData();
    createModel.operasyonlar = this.getAllRowDataOperasyon();

 
     this.UrunReceteService.create(createModel, () => { 
       this.router.navigate(['/pages/urun-recete/detail-urun-recete'], { state: createModel })
      },errorMessage => {})


  }
  getAllRowData() {
    let rowData = [];
    this.gridApi.forEachNode(node => rowData.push(node.data));
    return rowData;
  }
  ngModelChange(event) {
    if (event == '') {
      this.defaultBirimFiyat = 0
    }

  }
  changed(event) {

    this.selectedStok = event;

  }
  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;

  }
  filterSideMenu() {
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");

  }
  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.router.navigate(['/pages/stok/detail-stok'], { state: selectedRows })
  }
  stokSelectModal() {
    const modalRef = this.modalService.open(StokSelectModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';
    modalRef.result.then((stoks) => {
      if (stoks != false) {
        stoks.forEach(stok => {
          this.gridApi.applyTransaction({ add: [stok], addIndex: this.gridApi.getLastDisplayedRow() + 1 })
        });
        
      }
    });

  }
  onDelete(params) {
    this.gridApi.applyTransaction({ remove: [params.rowData] });
    return this.rowData;
  }
  async getAllStok() {
    this.StokDataSource = (await this.StokService.GetListTreeView(() => { })).data.items;
  }














  getListOperasyonlar(params: GridReadyEvent<any>) {
    this.gridApiOperasyonlar = params.api
  }

  operasyonSelectModal() {
    const modalRef = this.modalService.open(OperasyonSelectModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Operasyon';
    modalRef.result.then((isMerkezi) => {
      if (isMerkezi != false) {

        this.gridApiOperasyonlar.applyTransaction({ add: [isMerkezi], addIndex: this.gridApi.getLastDisplayedRow() + 1 })
      }
    });

  }

  getAllRowDataOperasyon() {
    let rowData = [];
    this.gridApiOperasyonlar.forEachNode(node => rowData.push(node.data));
    return rowData;
  }

  onDeleteOperasyon(params) {
    this.gridApiOperasyonlar.applyTransaction({ remove: [params.rowData] });
    return this.rowData2;
  }

}


