import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepoService } from '../../depo/core/services/depo.service';
import { BirimService } from '../core/services/birim.service';

@Component({
  selector: 'app-detail-birim',
  templateUrl: './detail-birim.component.html',
  styleUrls: ['./detail-birim.component.scss']
})
export class DetailBirimComponent implements OnInit {

  stateData: any;
  constructor(private router: Router,private BirimService:BirimService) {
    this.stateData = history.state
  }
  ngOnInit(): void {
    console.log(this.stateData);
  }

  Birim:any;
async  duzenle() {
    if (this.stateData?.id) {

      this.router.navigate(['/birim/update'], { state: history.state })

    }
    else {
      this.Birim = (await this.BirimService.getByHourId(this.stateData.hourId, () => { })).data;
      this.router.navigate(['/birim/update'], { state: this.Birim })
    }
  }
}
