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

declare var $: any;

@Component({
  selector: 'app-create-uretim-emri',
  templateUrl: './create-uretim-emri.component.html',
  styleUrls: ['./create-uretim-emri.component.scss']
})
export class CreateUretimEmriComponent implements OnInit {

  BirimDataSource: any[]
  selectedStok: any;
  selectedOption: any;
  UrunReceteDataSource: any[];
  stokDataSource: any[];
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
    private UretimEmriService: UretimEmriService,
    private UrunReceteService: UrunReceteService
  ) {
    this.frameworkComponents = {
      buttonRenderer: DeleteButtonComponent,
    }

  }
  ngOnInit() {
    this.getAllStok();
    this.getAllUrunRecete()



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
    { field: "miktar", editable: true },
    { field: "birimAdi" },
    {
      field: "", width: 50,
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.deleteRowData.bind(this),
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
        label: 'Click 1'
      }
    },

  ];




  kaydet() {
    const createModel = new CreateUretimEmriModel();
    createModel.stokAdi = this.selectedStok.ad;
    createModel.stokId = this.selectedStok.id;
    createModel.urunReceteId = this.selectedUrunRecete?.id?this.selectedUrunRecete?.id:null;
    createModel.urunReceteAdi = this.selectedUrunRecete?.stokAdi?this.selectedUrunRecete?.stokAdi:null;
    createModel.planlananTarih = null;
    createModel.sorumlu = null;
    createModel.miktar = Number(this.frm.value.miktar);
    createModel.hourId = String(new Date().valueOf());
    createModel.uretimEmriBilesenler = this.bilesenRowData();
    createModel.isEmirleri = [];



    this.UretimEmriService.create(createModel, () => {
      this.router.navigate(['/pages/uretim-emri/detail-uretim-emri'], { state: createModel })
    }, errorMessage => { })


  }

  bilesenEkle() {
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

  selectedStokDropdown(event){
    this.selectedStok = event.value;

    this.selectedUrunRecete = this.UrunReceteDataSource.find((el: any) => {
      return el?.stokId == this.selectedStok.id;
    });
    if (this.selectedUrunRecete) {
      this.rowData = this.selectedUrunRecete?.urunReceteBilesenler;
    }
    else{
      this.rowData=[]
    }
    
  }
  selectedUrunRecete: any;
  selectedUrunReceteDropdown(event){
    this.selectedUrunRecete = event.value;
    this.rowData = this.selectedUrunRecete.urunReceteBilesenler;
    this.selectedStok = this.stokDataSource.find((el: any) => {
      return el?.id == this.selectedUrunRecete.stokId;
    });
  }

  async gridApiBilesenList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
  }

  bilesenRowData() {
    let rowData = [];
    this.gridApi.forEachNode(node => rowData.push(node.data));
    return rowData;
  }
  async getAllStok() {
    this.stokDataSource = (await this.StokService.GetListTreeView(() => { })).data.items;
  }

  async getAllUrunRecete() {
    this.UrunReceteDataSource = (await this.UrunReceteService.GetList(() => { })).data.items;
  }

  deleteRowData(params) {
    this.gridApi.applyTransaction({ remove: [params.rowData] });
    return this.rowData;
  }














}


