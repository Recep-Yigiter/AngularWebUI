import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { DepoService } from 'src/app/core/services/repository/depo.service';

@Component({
  selector: 'app-depo',
  templateUrl: './depo.component.html',
  styleUrls: ['./depo.component.scss']
})
export class DepoComponent implements OnInit {


  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;


  constructor(
    private DepoService: DepoService,
    private router:Router,
    ) { }

  async ngOnInit() {

  }


  colDefs: ColDef[] = [
    { field: "kod" },
    { field: "ad" },
    { field: "giren" },
    { field: "cikan" },
    { field: "mevcut" },


  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.DepoService.GetList(() => { })).items;
  
  }
  onSelectionChanged() {
  
    const selectedRows = this.gridApi.getSelectedRows()[0];

    this.router.navigate(['/depo/detail'],{state:selectedRows})
  }

  filterSideMenu() {
    // document.getElementById("filter_menu").style.width ="200px";
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
  }


}