import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_TR } from 'src/AG_GRID_LOCALE_TR ';
import { MasrafService } from 'src/app/core/services/repository/masraf.service';
import { defaultColDef } from 'src/app/shared/default-col-def';
import { CreateMasrafComponent } from '../create-masraf/create-masraf.component';
import { UpdateMasrafComponent } from '../update-masraf/update-masraf.component';
import { DeleteModalComponents } from 'src/app/shared/utilities/confirms/delete-modal';
@Component({
  selector: 'app-list-masraf',
  templateUrl: './list-masraf.component.html',
  styleUrls: ['./list-masraf.component.scss']
})
export class ListMasrafComponent {

  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;
  public localeText: { [key: string]: string; } = AG_GRID_LOCALE_TR;
  public defaultColDef = defaultColDef;

  constructor(
    private MasrafService: MasrafService,
    private router:Router,
    private NgbModal:NgbModal
    ) { }

  ngOnInit(): void {

  }


  colDefs: ColDef[] = [
    { field: "kod" },
    { field: "ad" },


  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.MasrafService.GetList(() => { })).items;
  }
  onSelectionChanged() {
  
    const selectedRows = this.gridApi.getSelectedRows()[0];

   this.selectedMasraf=selectedRows
  }
  rowDblClick() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    // this.router.navigate(['/menu/malzeme-yonetimi/masraf/detail'],{state:selectedRows})
    this.updateModal()
  }
  filterSideMenu() {
    // document.getElementById("filter_menu").style.width ="200px";
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
  }

  buttonDisabled: boolean = true;
  selectedMasraf: any;
  createModal() {
    const modalRef = this.NgbModal.open(CreateMasrafComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Masraf Kartı';

    modalRef.result.then(async (item) => {
      this.refresh();
    });
  }

  updateModal() {
    if (this.selectedMasraf) {
      const modalRef = this.NgbModal.open(UpdateMasrafComponent, {
        size: 'md',
        backdrop: 'static',
      });
      modalRef.componentInstance.data = this.selectedMasraf;

      modalRef.result.then(async (item) => {
        if (item == true) {
          this.refresh();
        }
      });
    }
  }

  async refresh() {
    window.location.reload()

  }

  delete() {
    if (this.selectedMasraf) {
      const modalRef = this.NgbModal.open(DeleteModalComponents, {
        size: 'sm',
        backdrop: 'static',
      });
      modalRef.result.then((event) => {
        if (event == true) {
          this.MasrafService.delete(this.selectedMasraf.id, () => {
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
