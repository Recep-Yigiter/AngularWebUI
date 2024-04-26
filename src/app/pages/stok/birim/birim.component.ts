import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { BirimService } from './core/services/birim.service';

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

  ngOnInit(): void {

  }


  colDefs: ColDef[] = [
    { field: "ad" },
    { field: "kod" },

  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.rowData = (await this.BirimService.list(() => { })).data.items;
  }
  onSelectionChanged() {
  
    const selectedRows = this.gridApi.getSelectedRows()[0];

    this.router.navigate(['/pages/birim/detail-birim'],{state:selectedRows})
  }

  filterSideMenu() {
    // document.getElementById("filter_menu").style.width ="200px";
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
  }


}
