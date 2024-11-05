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
export class ListHizmetComponent {
  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;

  constructor(
    private HizmetService: HizmetService,
    private router: Router,
    private NgbModal: NgbModal
  ) {}

  ngOnInit(): void {}

  colDefs: ColDef[] = [{ field: 'kod' }, { field: 'ad' }];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.HizmetService.GetList(() => {})).items;
  }
  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.buttonDisabled = false;
    this.selectedHizmet = selectedRows;
  }
  rowDblClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    // this.router.navigate(['/menu/malzeme-yonetimi/hizmet/detail'], {
    //   state: selectedRows,
    // });
    this.updateModal();
  }

  filterSideMenu() {
    // document.getElementById("filter_menu").style.width ="200px";
    var element = document.getElementById('filter_menu');
    element.classList.toggle('mystyle');
  }
  buttonDisabled: boolean = true;
  selectedHizmet: any;
  createModal() {
    const modalRef = this.NgbModal.open(CreateHizmetComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Hizmet Kartı';

    modalRef.result.then(async (item) => {
      this.refresh();
    });
  }

  updateModal() {
    if (this.selectedHizmet) {
      const modalRef = this.NgbModal.open(UpdateHizmetComponent, {
        size: 'md',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = this.selectedHizmet;

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
    if (this.selectedHizmet) {
      const modalRef = this.NgbModal.open(DeleteModalComponents, {
        size: 'sm',
        backdrop: 'static',
      });
      modalRef.result.then((event) => {
        if (event == true) {
          this.HizmetService.delete(this.selectedHizmet.id, () => {
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
