import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';


@Component({
  selector: 'app-add-role-claims-button',
  template:`

<div (click)="onClick($event)" style="cursor: pointer; display: flex; align-items: center; justify-content: center; height: 100%; position: absolute; top: 0; left: 0; width: 100%;">


<button type="button" class="btn btn-link">İzinleri göster</button>


</div>

   `,
  styleUrls: ['./add-role-claims-button.component.scss']
})
export class AddRoleClaimsButtonComponent implements ICellRendererAngularComp {

  params;
  label: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data
      }
      this.params.onClick(params);

    }
  }
}