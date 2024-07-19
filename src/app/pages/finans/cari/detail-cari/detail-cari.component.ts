import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BirimService } from 'src/app/core/services/repository/birim.service';
import { CariService } from 'src/app/core/services/repository/cari.service';


@Component({
  selector: 'app-detail-cari',
  templateUrl: './detail-cari.component.html',
  styleUrls: ['./detail-cari.component.scss']
})
export class DetailCariComponent implements OnInit {

  stateData: any;
  constructor(private router: Router, private CariService: CariService) {
    this.stateData = history.state
  }
  ngOnInit(): void {

  }

  Cari: any;
  async duzenle() {
    if (this.stateData?.id) {

      this.router.navigate(['/menu/finans/cari/update'], { state: history.state })

    }
    else {
      this.Cari = (await this.CariService.getByHourId(this.stateData.hourId, () => { }));
      this.router.navigate(['/menu/finans/cari/update'], { state: this.Cari })
    }
  }

  sil() {
    this.CariService.delete(this.stateData.id)
  }

  async cariHareketler() {
    if (this.stateData?.id) {

      this.router.navigate(['/menu/finans/cari/detail-cari-hareketler'], { state: history.state })

    }
  }




}
