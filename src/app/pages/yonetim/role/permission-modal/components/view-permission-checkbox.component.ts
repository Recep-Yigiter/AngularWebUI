import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {ICellRendererParams } from 'ag-grid-community';
@Component({
  selector: 'app-view-permission-checkbox',
  template:`<input type="checkbox" [(ngModel)]="params.value" (change)="this.refresh(this.params)">`,
})
export class ViewPermissionCheckboxComponent implements ICellRendererAngularComp {
  public params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
      this.params = params;
  }

  refresh(params: any): boolean {
  
    params.data.view.checked = params.value
    if (params.data.create.checked ) {
    
    }

    params.api.refreshCells(params);
    return false;
  }
}