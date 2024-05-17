import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepoService } from '../core/services/depo.service';

@Component({
  selector: 'app-detail-depo',
  templateUrl: './detail-depo.component.html',
  styleUrls: ['./detail-depo.component.scss']
})
export class DetailDepoComponent implements OnInit {

  stateData: any;
  constructor(private router: Router, private DepoService: DepoService) {
    this.stateData = history.state
  }
  ngOnInit(): void {

  }
  Depo: any;
  async duzenle() {


    if (this.stateData?.id) {

      this.router.navigate(['/depo/update'], { state: history.state })

    }
    else {

      this.Depo = (await this.DepoService.getByHourId(this.stateData.hourId, () => { })).data;
      this.router.navigate(['/depo/update'], { state: this.Depo })

    }
  }


 async faturaHareketler() {
  if (this.stateData?.id) {

    this.router.navigate(['/depo/detail-depo-hareketler'], { state: history.state })

  }
  else {

    this.Depo = (await this.DepoService.getByHourId(this.stateData.hourId, () => { })).data;
    this.router.navigate(['/depo/detail-depo-hareketler'], { state: this.Depo })

  }

    // if (this.stateData?.id) {

    //   this.router.navigate(['/pages/depo/detail-depo-hareketler'], { state: this.stateData.faturaHareketler })

    // }
    // else {

    //   this.Depo = (await this.DepoService.getByHourId(this.stateData.hourId, () => { })).data;
    //   this.router.navigate(['/pages/depo/detail-depo-hareketler'], { state: this.Depo.faturaHareketler })

    // }
  }
}
