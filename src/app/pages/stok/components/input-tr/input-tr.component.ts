
import { CurrencyPipe } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-tr',
  templateUrl: './input-tr.component.html',
  styleUrls: ['./input-tr.component.scss'],
  providers: [CurrencyPipe],
})
export class InputTrComponent {
  @Input() label: any;
  @Input() formControlNames: any;
  @Input() field: any;
  @Input() selectClass: any;

  
  constructor(private ref: ChangeDetectorRef) {

  }
}
