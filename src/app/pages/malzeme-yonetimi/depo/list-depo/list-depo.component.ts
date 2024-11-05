import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { DepoService } from 'src/app/core/services/repository/depo.service';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { DeleteModalComponents } from 'src/app/shared/utilities/confirms/delete-modal';
import { CreateDepoComponent } from '../create-depo/create-depo.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateDepoComponent } from '../update-depo/update-depo.component';

@Component({
  selector: 'app-list-depo',
  templateUrl: './list-depo.component.html',
  styleUrls: ['./list-depo.component.scss'],
})
export class ListDepoComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;

  constructor(private DepoService: DepoService, private NgbModal: NgbModal) {}

  async ngOnInit() {}

  colDefs: ColDef[] = [
    { field: 'ad', width: 200, filter: 'agTextColumnFilter' },
    { field: 'kod', width: 200, filter: 'agTextColumnFilter' },
    { field: 'giren', width: 100 },
    { field: 'cikan', width: 100 },
    { field: 'mevcut', width: 100 },
    
  ];




  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (
      await this.DepoService.GetList(
        () => {},
        (errorMessage) => {
          console.log('Hata....', errorMessage.error);
        }
      )
    ).items;
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
    const modalRef = this.NgbModal.open(CreateDepoComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Depo Kartı';

    modalRef.result.then(async (item) => {
      this.refresh();
    });
  }

  updateModal() {
    if (this.selectedRow) {
      const modalRef = this.NgbModal.open(UpdateDepoComponent, {
        size: 'md',
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
          this.DepoService.delete(this.selectedRow.id, () => {
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
