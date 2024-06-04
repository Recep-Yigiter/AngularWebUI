import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-input-tr',
  templateUrl: './title-input-tr.component.html',
  styleUrls: ['./title-input-tr.component.scss']
})
export class TitleInputTrComponent {
  @Input() label: any;
  @Input() formControlNames: any;
  @Input() field: any;
  @Input() selectClass: any;
}
