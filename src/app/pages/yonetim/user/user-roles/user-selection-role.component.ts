import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {ICellRendererParams } from 'ag-grid-community';
@Component({
  selector: 'app-user-selection-role',
  template:`<input type="checkbox" [(ngModel)]="params.value" (change)="this.refresh(this.params)">`
})
export class UserSelectionRoleComponent implements ICellRendererAngularComp {
  public params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
      this.params = params;
  }

  refresh(params: any): boolean {
    params.data.isAssigned = params.value
    params.api.refreshCells(params);
    return false;
  }
}