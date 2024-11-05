import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';


@Component({
  selector: 'app-uretim-emri',
  templateUrl: './uretim-emri.component.html',
  styleUrls: ['./uretim-emri.component.scss'],

})
export class UretimEmriComponent implements OnInit {


  rowData: any[];
  public rowSelection: 'single' | 'multiple' = 'single';
  private gridApi!: GridApi<any>;



  ngOnInit(): void {

  }




}
