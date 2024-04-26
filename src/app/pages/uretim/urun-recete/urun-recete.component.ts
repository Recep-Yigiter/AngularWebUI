import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { UrunReceteService } from './core/services/urun-recete.service';

@Component({
  selector: 'app-urun-recete',
  templateUrl: './urun-recete.component.html',
  styleUrls: ['./urun-recete.component.scss']
})
export class UrunReceteComponent implements OnInit {


  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;


  constructor(
   private UrunReceteService:UrunReceteService,
    private router:Router,
    ) { }

  ngOnInit(): void {

  }


  colDefs: ColDef[] = [
    { field: "stokKodu" },
    { field: "stokAdi" },


  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
     this.rowData = (await this.UrunReceteService.GetList(() => { })).data.items;
  }
  onSelectionChanged() {
  
    const selectedRows = this.gridApi.getSelectedRows()[0];

    this.router.navigate(['/pages/urun-recete/detail-urun-recete'],{state:selectedRows})
  }

  filterSideMenu() {
    // document.getElementById("filter_menu").style.width ="200px";
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
  }


}
