import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { SiparisService } from 'src/app/core/services/repository/siparis.service';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUrunReceteComponent } from '../create-urun-recete/create-urun-recete.component';
import { CreateUrunReceteHareketComponent } from '../../urun-recete-hareket/create-urun-recete-hareket/create-urun-recete-hareket.component';
import { ListUrunReceteHareketComponent } from '../../urun-recete-hareket/list-urun-recete-hareket/list-urun-recete-hareket.component';
import { UrunReceteService } from 'src/app/core/services/repository/urun-recete.service';
import { UpdateUrunReceteComponent } from '../update-urun-recete/update-urun-recete.component';
import { DeleteModalComponents } from 'src/app/shared/utilities/confirms/delete-modal';
import { UrunReceteHareketService } from 'src/app/core/services/repository/urun-recete-hareket.service';

@Component({
  selector: 'app-list-urun-recete',
  templateUrl: './list-urun-recete.component.html',
  styleUrls: ['./list-urun-recete.component.scss'],
  providers: [DatePipe],
})
export class ListUrunReceteComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;
  pageNull: boolean = false;
  colDefs: ColDef[] = [
    { field: 'kod', headerName: 'Kod', width: 120 },
    { field: 'ad', headerName: 'Reçete Adı' },
    { field: 'stokAdi', headerName: 'Stok Adı' },
    { field: 'bilesenSayisi', headerName: 'Bileşen Sayısı', width: 90 },
  ];

  /**
   *
   */
  constructor(
    private UrunReceteService: UrunReceteService,
    private UrunReceteHareketService:UrunReceteHareketService,
    private router: Router,
    private DatePipe: DatePipe,
    private NgbModal: NgbModal
  ) {}
  ngOnInit(): void {

  }

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (
      await this.UrunReceteService.GetList(
        () => {},
        (errorMessage) => {
          console.log('Hata....', errorMessage.error);
        }
      )
    ).items;

    if (this.rowData.length == 0) {
      this.pageNull = true;
    }
  }

  rowClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.selectedRow = selectedRows;
    this.buttonDisabled = false;
  }
  rowDblClick() {
    this.updateModal();
  }

  createModal() {
    const modalRef = this.NgbModal.open(CreateUrunReceteComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'UrunRecete Kartı';

    modalRef.result.then(async (item) => {
      if (item) {
        this.refresh();
      }
    });
  }

  updateModal() {
    if (this.selectedRow) {
      const modalRef = this.NgbModal.open(UpdateUrunReceteComponent, {
        size: 'xl',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = this.selectedRow;

      modalRef.result.then(async (item) => {
        if (item == true) {
          this.refresh();
        }
      });
    }
  }

  async refresh() {
    window.location.reload();
  }

  delete() {
    if (this.selectedRow) {
      const modalRef = this.NgbModal.open(DeleteModalComponents, {
        size: 'sm',
        backdrop: 'static',
      });
      modalRef.result.then((event) => {
        if (event == true) {
          this.selectedRow.urunReceteHareketler.forEach((element) => {
            this.UrunReceteHareketService.delete(element.id);
          });

          this.UrunReceteService.delete(this.selectedRow.id,()=>{
            this.refresh();
          });


        }
      });
    }
  }
  filter: boolean = false;
  filtrele() {
    this.filter = !this.filter;
  }
}
