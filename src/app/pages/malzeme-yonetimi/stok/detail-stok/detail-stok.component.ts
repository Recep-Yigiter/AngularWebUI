import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { ROUTER_NAVIGATE } from 'src/ROUTER_NAVIGATE';

@Component({
  selector: 'app-detail-stok',
  templateUrl: './detail-stok.component.html',
  styleUrls: ['./detail-stok.component.scss'],
  providers: [CurrencyPipe,DatePipe]
})
export class DetailStokComponent implements OnInit {

  stateData: any;
  Stok: any;
  dateTime: any = new Date();

  time: any = new Date();
  rxTime: any = new Date();
  constructor(private router: Router, private StokService: StokService, private DatePipe: DatePipe) {
    this.stateData = history.state
  }
  ngOnInit(): void {
   
    // this.dateTime = this.DatePipe.transform(this.stateData.createdDate, 'yyyy-MM-dd');
    // this.time = this.DatePipe.transform(this.stateData.createdDate, 'hh : mm ')


  }

  async duzenle() {
    if (this.stateData?.id) {

      this.router.navigate([ROUTER_NAVIGATE.stok_update], { state: this.stateData })
    }
    else {

      this.Stok = (await this.StokService.getByHourId(this.stateData.hourId, () => { }));
      this.router.navigate([ROUTER_NAVIGATE.stok_update], { state: this.Stok })
    }
  }







 async actions(){

    if (this.stateData?.id) {

      this.router.navigate([ROUTER_NAVIGATE.stok_detail_actions], { state: history.state })


    }
    else {

       this.Stok = (await this.StokService.getByHourId(this.stateData.hourId, () => { }));
      this.router.navigate([ROUTER_NAVIGATE.stok_detail_actions], { state: this.Stok })

    }

  }






  geri() {
    this.router.navigate([ROUTER_NAVIGATE.stok_list])
  }

  vazgec() {
    this.router.navigate([ROUTER_NAVIGATE.stok_list])
  }





}
