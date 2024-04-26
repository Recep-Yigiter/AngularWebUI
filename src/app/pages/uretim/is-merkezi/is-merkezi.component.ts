import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { IsMerkeziService } from './core/services/is-merkezi.service';

@Component({
  selector: 'app-is-merkezi',
  templateUrl: './is-merkezi.component.html',
  styleUrls: ['./is-merkezi.component.scss']
})
export class IsMerkeziComponent implements OnInit {


  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;


  constructor(
   private IsMerkeziService:IsMerkeziService,
    private router:Router,
    ) { }

  ngOnInit(): void {

  }


  colDefs: ColDef[] = [
    { field: "ad",headerName:"İş Merkezi Adi", },
    { field: "kod",headerName:"İş Merkezi Kodu"},
    { field: "zamanVerimlilik",headerName:"Zaman Verimlilik"},
    { field: "kapasite",headerName:"Kapasite" },
    { field: "kurulumZamani",headerName:'Kurulum Zamanı' },
    { field: "temizlikZamani",headerName:'Temizlik Zamanı' },
    { field: "saatBasinaMaliyet",headerName:'Saat Başına Maliyet' },
    { field: "aciklama",headerName:'Acıklama' },

  ];

  async getList(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
     this.rowData = (await this.IsMerkeziService.GetList(() => { })).data.items;
    
   
  }
  onSelectionChanged() {
  
    const selectedRows = this.gridApi.getSelectedRows()[0];

    this.router.navigate(['/pages/is-merkezi/detail-is-merkezi'],{state:selectedRows})
  }

  filterSideMenu() {
    // document.getElementById("filter_menu").style.width ="200px";
    var element = document.getElementById("filter_menu");
    element.classList.toggle("mystyle");
  }


}
