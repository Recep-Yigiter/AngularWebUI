import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

import { HttpErrorResponse } from '@angular/common/http';
import { BirimService } from 'src/app/core/services/repository/birim.service';

@Component({
  selector: 'app-birim',
  templateUrl: './birim.component.html',
  styleUrls: ['./birim.component.scss']
})
export class BirimComponent  implements OnInit {


  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;


  constructor(
    private BirimService: BirimService,
    private router:Router,
    ) { }

  async ngOnInit() {

  }


  colDefs: ColDef[] = [
    { field: "ad" },
    { field: "kod" },

  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.BirimService.list(() => { }, errorMessage =>{console.log("Hata....",errorMessage.error)} )).items;

  }
  onSelectionChanged() {
  
    const selectedRows = this.gridApi.getSelectedRows()[0];

    this.router.navigate(['/birim/detail'],{state:selectedRows})
  }

  filterSideMenu() {
    // document.getElementById("filter_menu").style.width ="200px";
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
  }


}
