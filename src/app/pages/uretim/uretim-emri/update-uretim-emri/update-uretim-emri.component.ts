import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from 'src/app/core/services/api-client.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StokService } from 'src/app/pages/stok/stok/core/services/stok.service';
import { CreateUretimEmriModel } from '../core/models/create-uretim-emri-model';
import { UretimEmriService } from '../core/services/uretim-emri.service';
import { DeleteButtonComponent } from '../../urun-recete/components/delete-button/delete-button.component';
import { StokSelectModalComponent } from '../../urun-recete/components/stok-select-modal/stok-select-modal.component';
import { OperasyonSelectModalComponent } from '../../urun-recete/components/operasyon-select-modal/operasyon-select-modal.component';
import { UrunReceteService } from '../../urun-recete/core/services/urun-recete.service';
import { UpdateUretimEmriModel } from '../core/models/update-uretim-emri-model';
import { UretimEmriBilesenService } from '../core/services/uretim-emri-bilesen.service';

@Component({
  selector: 'app-update-uretim-emri',
  templateUrl: './update-uretim-emri.component.html',
  styleUrls: ['./update-uretim-emri.component.scss']
})
export class UpdateUretimEmriComponent implements OnInit {

  BirimDataSource: any[]
  selectedStok: any;
  selectedOption: any;
  UrunReceteDataSource: any[];
  stokDataSource: any[];
  defaultBirimFiyat = 0;
  rowData: any[];
  rowData2: any[];
  stateData:any;
  frameworkComponents: any;
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;

  private gridApiOperasyonlar!: GridApi<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private StokService: StokService,
    private UretimEmriService: UretimEmriService,
    private UretimEmriBilesen:UretimEmriBilesenService,
    private UrunReceteService: UrunReceteService
  ) {
    this.frameworkComponents = {
      buttonRenderer: DeleteButtonComponent,
    }


    this.stateData = history.state
    this.frameworkComponents = {
      buttonRenderer: DeleteButtonComponent,
    }
  }
  ngOnInit() {
    this.getAllStok();
    this.getAllUrunRecete();
    this.stateControl();
  }


  public frm: FormGroup = this.fb.group(
    {
      stokId: [null,],
      miktar: [null,],
      birimAdi: [null,],
      urunReceteId: [null,],
      planlananTarih: [null,],
      sorumlu: [null,],
    }
  )


  get stokId() { return this.frm.get('stokId') }
  get miktar() { return this.frm.get('miktar') }
  get birimAdi() { return this.frm.get('birimAdi') }
  get urunReceteId() { return this.frm.get('urunReceteId') }
  get planlananTarih() { return this.frm.get('planlananTarih') }
  get sorumlu() { return this.frm.get('sorumlu') }



  colDefs: ColDef[] = [
    { field: "stokAdi", width: 600 },
    { field: "miktar", editable: true,onCellValueChanged: (event) => this.uretimEmriBilesenUpdate(event) },
    { field: "birimAdi" },
    {
      field: "", width: 50,
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.uretimEmriBilesenDelete.bind(this),
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



  update() {
    const createModel = new UpdateUretimEmriModel();
    createModel.id=this.stateData.id;
    createModel.stokAdi = this.selectedStok.ad;
    createModel.stokId = this.selectedStok.id;
    createModel.urunReceteId = this.selectedUrunRecete.id;
    createModel.urunReceteAdi = this.selectedUrunRecete.ad?this.selectedUrunRecete.ad:this.selectedUrunRecete.stokAdi;
    createModel.planlananTarih = null;
    createModel.sorumlu = null;
    createModel.miktar = Number(this.frm.value.miktar);
    createModel.hourId = String(new Date().valueOf());
    createModel.uretimEmriBilesenler = this.getAllRowData();

   
    this.UretimEmriService.update(createModel, () => {
      this.router.navigate(['/pages/uretim-emri/detail-uretim-emri'], { state: createModel })
    }, errorMessage => { })


  }
  uretimEmriBilesenUpdate(event) {

    const editdata = {
      id: event.data.id,
      stokId: event.data.stokId,
      uretimEmriId: this.stateData.id,
      miktar: event.data.miktar,
    }

    this.UretimEmriBilesen.update(editdata, () => { })

  }

  uretimEmriBilesenDelete(params) {
    this.gridApi.applyTransaction({ remove: [params.rowData] });
    this.UretimEmriBilesen.delete(params.rowData.id, () => { })
    return this.rowData;
  }
  getByIdDataSource:any;
  async stateControl() {
  



    if (this.stateData?.id) {
      this.getByIdDataSource = (await this.UretimEmriService.getById(this.stateData.id)).data;
      this.rowData = this.getByIdDataSource.uretimEmriBilesenler;
      // this.rowData2 = this.getByIdDataSource.operasyonlar;
      
    }
    else {
      this.rowData = this.stateData.uretimEmriBilesenler;
      // this.rowData2 = this.stateData.operasyonlar;

    }
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

    this.selectedStok = event.value;
    this.selectedUrunRecete = []

  }
  selectedUrunRecete: any;
  changedUrunRecete(event) {

    this.selectedUrunRecete = event.value;
    this.rowData = this.selectedUrunRecete.urunReceteBilesenler;
    this.selectedStok = this.stokDataSource.find((el: any) => {
      return el?.id == this.selectedUrunRecete.stokId;
    });

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
          const updateData = {
            stokId: stok.stokId,
            uretimEmriId: this.stateData.id,
            miktar: 1,
          }

           this.UretimEmriBilesen.create(updateData, () => { })
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
    this.stokDataSource = (await this.StokService.GetListTreeView(() => { })).data.items;
    this.selectedStok = this.stokDataSource.find((el: any) => {
      return el?.id == this.stateData.stokId;
    });
    
  }

  async getAllUrunRecete() {
    this.UrunReceteDataSource = (await this.UrunReceteService.GetList(() => { })).data.items;
    this.selectedUrunRecete = this.UrunReceteDataSource.find((el: any) => {
      return el?.id == this.stateData.urunReceteId;
    });

  }






  vazgec() {
    this.stateData.uretimEmriBilesenler = this.getAllRowData()
    this.router.navigate(['/pages/uretim-emri/detail-uretim-emri'], { state: this.stateData })
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


