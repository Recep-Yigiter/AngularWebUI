import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {ICellRendererParams } from 'ag-grid-community';
@Component({
  selector: 'app-onay-durum-select',
  templateUrl: './onay-durum-select.component.html',
  styleUrls: ['./onay-durum-select.component.scss']
})
export class OnayDurumSelectComponent implements ICellRendererAngularComp {
  public params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
      this.params = params;
  }

  refresh(params: any): boolean {
  
    params.data.create.checked = params.value
    if (params.data.create.checked ) {
    
    }

    params.api.refreshCells(params);
    return false;
  }
}