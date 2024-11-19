import { CurrencyPipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-form-checkbox',
  template: `
    <tr
      class="yks_table_group"
      style="display: grid; grid-template-columns: {{ span }}px auto"
    >
      <td
        *ngIf="labelNone"
        class="pl-2 "
        style="
                border-right: 1px solid #ddd;
                color: #212529;
                width: 90%;
                padding: 0px 6px 0px 8px;
                min-width: 70px;
                font-weight: 600;
                font-size: 13px; 
                display: flex;
                align-items:  center;
                font-style: oblique; position: relative; "
        [style]="stylesLabel"
      >
       
        

      </td>

      <td
        style="
                display: flex;
                align-items: center;
                color: #212529;
                min-width: 130px;
                font-weight: 600;
                font-size: 13px; 
                display: flex;
                align-items:  center;
                font-style: oblique;"
      >
        <mat-checkbox
   style="height: 27px;"
          [style]="stylesInput"
          [(ngModel)]="field"
          [formControl]="formControlNames"
          >
          <label style=" min-width: 50px; font-weight: 600; font-size: 13px;"> {{ label }}
          </label>
        </mat-checkbox>

        
      </td>
    </tr>
  `,
})
export class AlisFaturaFormCheckboxComponent implements AfterViewInit {
  @Input() label: any;
  @Input() formControlNames: any;
  @Input() field: any;
  @Input() span: any;
  @Input() labelNone: any = true;
  @Input() status: any = true;
  @Input() stylesLabel: any;
  @Input() stylesInput: any;
  @Input() readOnly: boolean = false;

  constructor(private ref: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    this.ref.detectChanges();
  }
}
