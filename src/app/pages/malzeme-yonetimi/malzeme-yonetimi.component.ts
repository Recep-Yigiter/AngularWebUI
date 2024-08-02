import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_NAVIGATE } from 'src/ROUTER_NAVIGATE';

@Component({
  selector: 'app-malzeme-yonetimi',
  templateUrl: './malzeme-yonetimi.component.html',
  styleUrls: ['./malzeme-yonetimi.component.scss'],
})
export class MalzemeYonetimiComponent {


  constructor(private router: Router) {}

  sff(){
    this.router.navigate([ROUTER_NAVIGATE.stok_update])
  }
}
