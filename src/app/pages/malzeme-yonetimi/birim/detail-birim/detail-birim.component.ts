import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BirimService } from 'src/app/core/services/repository/birim.service';


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
  
  }

  Birim:any;
async  duzenle() {
    if (this.stateData?.id) {

      this.router.navigate(['/menu/malzeme-yonetimi/birim/update'], { state: history.state })

    }
    else {
      this.Birim = (await this.BirimService.getByHourId(this.stateData.hourId, () => { }));
      this.router.navigate(['/menu/malzeme-yonetimi/birim/update'], { state: this.Birim })
    }
  }

  sil(){
    this.BirimService.delete(this.stateData.id)
  }
}
