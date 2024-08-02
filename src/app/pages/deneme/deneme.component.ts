import { Component, OnInit } from '@angular/core';
import * as resize from '../../../../src/assets/js/deneme-resize';
@Component({
  selector: 'app-deneme',
  templateUrl: './deneme.component.html',
  styleUrls: ['./deneme.component.scss']
})
export class DenemeComponent implements OnInit {
  ngOnInit(): void {
    resize.denemeFunction();
  }



}
