import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-design',
  templateUrl: './stok-design.component.html',
  styleUrls: ['./stok-design.component.scss']
})
export class StokDesignComponent {
  @Input() w100:any;
  @Input() displayNone:any;
  

}
