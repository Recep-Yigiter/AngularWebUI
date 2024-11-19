import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { HizmetService } from 'src/app/core/services/repository/hizmet.service';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { CreateHizmetComponent } from '../create-hizmet/create-hizmet.component';
import { UpdateHizmetComponent } from '../update-hizmet/update-hizmet.component';
import { DeleteModalComponents } from 'src/app/shared/utilities/confirms/delete-modal';
@Component({
  selector: 'app-list-hizmet',
  templateUrl: './list-hizmet.component.html',
  styleUrls: ['./list-hizmet.component.scss'],
})
export class ListHizmetComponent implements OnInit {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;
  buttonDisabled: boolean = true;
  selectedRow: any;

  constructor(private HizmetService: HizmetService, private NgbModal: NgbModal) {}

  async ngOnInit() {}

  colDefs: ColDef[] = [
    { field: 'ad', width: 200, filter: 'agTextColumnFilter' },
    { field: 'kod', width: 200, filter: 'agTextColumnFilter' },
  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (
      await this.HizmetService.GetList(
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
    const modalRef = this.NgbModal.open(CreateHizmetComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Hizmet Kartı';

    modalRef.result.then(async (item) => {
      if (item == true) {
        this.refresh();
      }
    });
  }

  updateModal() {
    if (this.selectedRow) {
      const modalRef = this.NgbModal.open(UpdateHizmetComponent, {
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
          this.HizmetService.delete(this.selectedRow.id, () => {
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
