import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent {
  @Input() w100:any;
  @Input() displayNone:any;
  

}
