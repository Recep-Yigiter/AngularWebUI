import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-is-merkezi',
  templateUrl: './detail-is-merkezi.component.html',
  styleUrls: ['./detail-is-merkezi.component.scss']
})
export class DetailIsMerkeziComponent implements OnInit {
  stateData: any;

  constructor( ) {
    this.stateData = history.state


  }
  async ngOnInit() {

console.log(this.stateData);
  }

}
