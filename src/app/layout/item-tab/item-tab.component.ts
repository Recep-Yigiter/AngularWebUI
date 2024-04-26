import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-tab',
  templateUrl: './item-tab.component.html',
  styleUrls: ['./item-tab.component.scss']
})
export class ItemTabComponent {
  @Input() tabTitle: string;
  @Input() active = false;
  constructor() { }

  ngOnInit(): void {
  }
}
