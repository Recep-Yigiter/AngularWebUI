/**
 * A single tab page. It renders the passed template
 * via the @Input properties by using the ngTemplateOutlet
 * and ngTemplateOutletContext directives.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'tab-item',
  styles: [
    `

  `
  ],
  template: `
    <div [hidden]="!active" >
      <ng-content></ng-content>
    </div>
  `
})
export class TabItemComponent {
  @Input('tabTitle') title: string;
  @Input() active = false;
}
