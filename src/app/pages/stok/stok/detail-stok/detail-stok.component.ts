import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StokService } from '../core/services/stok.service';

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
    this.dateTime = this.DatePipe.transform(this.stateData.createdDate, 'yyyy-MM-dd');
    this.time = this.DatePipe.transform(this.stateData.createdDate, 'hh : mm ')
    console.log(this.stateData);
  }

  async duzenle() {
    if (this.stateData?.id) {

      this.router.navigate(['/stok/update'], { state: this.stateData })
    }
    else {

      this.Stok = (await this.StokService.getByHourId(this.stateData.hourId, () => { })).data;
      this.router.navigate(['/stok/update'], { state: this.Stok })
    }
  }







 async actions(){

    if (this.stateData?.id) {

      this.router.navigate(['/stok/detail-stok-actions'], { state: history.state })


    }
    else {

       this.Stok = (await this.StokService.getByHourId(this.stateData.hourId, () => { })).data;
      this.router.navigate(['/stok/detail-stok-actions'], { state: this.Stok })

    }

  }

}
