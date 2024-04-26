import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasrafService } from '../core/services/masraf.service';

@Component({
  selector: 'app-detail-masraf',
  templateUrl: './detail-masraf.component.html',
  styleUrls: ['./detail-masraf.component.scss']
})
export class DetailMasrafComponent implements OnInit {

  stateData: any;
  constructor(private router: Router, private MasrafService: MasrafService) {
    this.stateData = history.state
  }
  ngOnInit(): void {

  }
  Masraf: any;
  async duzenle() {


    if (this.stateData?.id) {

      this.router.navigate(['/pages/masraf/update-masraf'], { state: history.state })

    }
    else {

      this.Masraf = (await this.MasrafService.getByHourId(this.stateData.hourId, () => { })).data;
      this.router.navigate(['/pages/masraf/update-masraf'], { state: this.Masraf })

    }
  }



}
