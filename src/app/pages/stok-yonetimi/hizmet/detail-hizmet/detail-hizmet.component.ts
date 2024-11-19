import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HizmetService } from 'src/app/core/services/repository/hizmet.service';

@Component({
  selector: 'app-detail-hizmet',
  templateUrl: './detail-hizmet.component.html',
  styleUrls: ['./detail-hizmet.component.scss']
})
export class DetailHizmetComponent {

  stateData: any;
  constructor(private router: Router,private HizmetService:HizmetService) {
    this.stateData = history.state
  }
  ngOnInit(): void {
    
  }
Hizmet:any;
 async duzenle() {
  

    if (this.stateData?.id) {
   
      this.router.navigate(['/menu/malzeme-yonetimi/hizmet/update'], { state: history.state })

    }
    else {
    
      this.Hizmet = (await this.HizmetService.getByHourId(this.stateData.hourId, () => { }));
      this.router.navigate(['/hizmet/update'], { state: this.Hizmet })

    }
  }
}
