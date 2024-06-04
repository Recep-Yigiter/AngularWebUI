import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from 'src/app/core/services/api-client.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StokSelectModalComponent } from '../components/stok-select-modal/stok-select-modal.component';
import { DeleteButtonComponent } from '../components/delete-button/delete-button.component';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { CreateUrunReceteModel } from '../core/models/create-urun-recete-model';
import { UpdateUrunReceteModel } from '../core/models/update-urun-recete-model';
import { UrunReceteService } from '../core/services/urun-recete.service';
import { UrunReceteBilesenService } from '../core/services/urun-recete-bilesen.service';
import { OperasyonSelectModalComponent } from '../components/operasyon-select-modal/operasyon-select-modal.component';
@Component({
  selector: 'app-update-urun-recete',
  templateUrl: './update-urun-recete.component.html',
  styleUrls: ['./update-urun-recete.component.scss']
})
export class UpdateUrunReceteComponent implements OnInit {

  StokDataSource: any[]
  BirimDataSource: any[]
  getByIdDataSource: any;
  selectedStokId: any;
  selectedObject: any;
  stateData: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private StokService: StokService,
    private UrunReceteService: UrunReceteService,
    private UrunReceteBilesen: UrunReceteBilesenService
  ) {
    this.stateData = history.state
    this.frameworkComponents = {
      buttonRenderer: DeleteButtonComponent,
    }
  }

  //---------------------------------------------------------------------------------------------------------------------------------------ngOnInit
  async ngOnInit() {
    this.stokSelectDropdown();
    this.stateControl();

  }



  public frm: FormGroup = this.fb.group({
    miktar: [null, [Validators.required, Validators.maxLength(16)]],
    stokId: [null, [Validators.required, Validators.maxLength(16)]],
    referans: [null, [Validators.required, Validators.maxLength(16)]],
    boMTuru: [null, [Validators.required, Validators.maxLength(16)]],

  })
  get miktar() { return this.frm.get('miktar') }
  get stokId() { return this.frm.get('stokId') }
  get referans() { return this.frm.get('referans') }
  get boMTuru() { return this.frm.get('boMTuru') }








 
  rowData: any[];
  rowData2:any[];
  frameworkComponents: any;
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  private gridApiOperasyonlar!: GridApi<any>;
 

  colDefs: ColDef[] = [
    { field: "stokAdi", width: 600 },
    {
      field: "miktar",
      editable: true,
      onCellValueChanged: (event) => this.receteBilesenUpdate(event)
    },
    { field: "birimAdi" },
    {
      field: "", width: 50,
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.receteBilesenDelete.bind(this),
        label: 'Click 1'
      }
    },

  ];

  colDefs2: ColDef[] = [
    { field: "ad", width: 600, editable: true,
    onCellValueChanged: (event) => this.operasyonUpdate(event) },
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





  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;

  }

  filterSideMenu() {
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");

  }

  async stateControl() {
    if (this.stateData?.id) {

      this.getByIdDataSource = (await this.UrunReceteService.getById(this.stateData.id)).items;
      this.rowData = this.getByIdDataSource.urunReceteBilesenler;
      this.rowData2 = this.getByIdDataSource.operasyonlar;
    }
    else {
      this.rowData = this.stateData.urunReceteBilesenler;
      this.rowData2 = this.stateData.operasyonlar;

    }
  }

  async stokSelectDropdown() {
    this.StokDataSource = (await this.StokService.GetListTreeView(() => { })).items;
  }

  stokSelectListModal() {
    const modalRef = this.modalService.open(StokSelectModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Bileşen';

    modalRef.result.then((userResponse) => {

      if (userResponse != false) {

        userResponse.forEach(element => {
          const updateData = {
            stokId: element.stokId,
            urunReceteId: this.stateData.id,
            miktar: 1,
          }

          this.UrunReceteBilesen.create(updateData, () => { })
          this.gridApi.applyTransaction({ add: [element], addIndex: this.gridApi.getLastDisplayedRow() + 1 })
        });


      }

    });
  }

  receteUpdate() {
    const createModel = new UpdateUrunReceteModel();
    createModel.id = this.stateData.id;
    createModel.miktar = Number(this.frm.value.miktar);
    createModel.stokId = this.selectedStokId;
    createModel.stokAdi = this.selectedObject?.ad ? this.selectedObject?.ad : this.stateData.stokAdi;
    createModel.stokKodu = this.selectedObject?.kod ? this.selectedObject?.kod : this.stateData.stokKodu;
    createModel.referans = this.frm.value.referans;
    createModel.boMTuru = this.frm.value.boMTuru;
    createModel.hourId = this.stateData.hourId;
    createModel.urunReceteBilesenler = this.getAllRowData();

    this.UrunReceteService.update(createModel, () => {
      this.router.navigate(['/pages/urun-recete/detail-urun-recete'], { state: this.stateData })
    })
  }

  receteBilesenUpdate(event) {

    const editdata = {
      id: event.data.id,
      stokId: event.data.stokId,
      urunReceteId: this.stateData.id,
      miktar: event.data.miktar,
    }

    this.UrunReceteBilesen.update(editdata, () => { })

  }

  receteBilesenDelete(params) {
    this.gridApi.applyTransaction({ remove: [params.rowData] });
    this.UrunReceteBilesen.delete(params.rowData.id, () => { })
    return this.rowData;
  }
  changed(event) {
    this.selectedStokId = event;
    if (this.StokDataSource != undefined) {
      this.selectedObject = this.StokDataSource.find((el: any) => {
        return el?.id == this.selectedStokId;
      });


    }

  }

  getAllRowData() {
    let rowData = [];
    this.gridApi.forEachNode(node => rowData.push(node.data));
    return rowData;
  }

  vazgec() {
    this.stateData.urunReceteBilesenler = this.getAllRowData()
    this.router.navigate(['/pages/urun-recete/detail-urun-recete'], { state: this.stateData })
  }





  getListOperasyonlar(params: GridReadyEvent<any>) {
    this.gridApiOperasyonlar = params.api
  }

  operasyonUpdate(event) {

    const editdata = {
      id: event.data.id,
      stokId: event.data.stokId,
      urunReceteId: this.stateData.id,
      miktar: event.data.miktar,
    }

    this.UrunReceteBilesen.update(editdata, () => { })

  }

  operasyonSelectModal(){
    const modalRef = this.modalService.open(OperasyonSelectModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.confirmationBoxTitle = 'Arama : Operasyon';

    modalRef.result.then((userResponse) => {

      if (userResponse != false) {
        this.gridApiOperasyonlar.applyTransaction({ add: [userResponse], addIndex: this.gridApi.getLastDisplayedRow() + 1 })
        // userResponse.forEach(element => {
        //   const updateData = {
        //     stokId: element.stokId,
        //     urunReceteId: this.stateData.id,
        //     miktar: 1,
        //   }

        //    this.UrunReceteBilesen.create(updateData, () => { })
         
        // });


      }

    });
  }

  onDeleteOperasyon(params) {
    this.gridApiOperasyonlar.applyTransaction({ remove: [params.rowData] });
    return this.rowData2;
  }





}
