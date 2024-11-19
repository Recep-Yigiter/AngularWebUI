import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasrafService } from 'src/app/core/services/repository/masraf.service';

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

      this.router.navigate(['/menu/malzeme-yonetimi/masraf/update'], { state: history.state })

    }
    else {

      this.Masraf = (await this.MasrafService.getByHourId(this.stateData.hourId, () => { }));
      this.router.navigate(['/menu/malzeme-yonetimi/masraf/update'], { state: this.Masraf })

    }
  }



}
