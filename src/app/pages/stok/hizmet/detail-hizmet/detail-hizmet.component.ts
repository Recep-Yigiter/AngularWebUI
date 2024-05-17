import { Component } from '@angular/core';
import { HizmetService } from '../core/services/hizmet.service';
import { Router } from '@angular/router';

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
   
      this.router.navigate(['/hizmet/update'], { state: history.state })

    }
    else {
    
      this.Hizmet = (await this.HizmetService.getByHourId(this.stateData.hourId, () => { })).data;
      this.router.navigate(['/hizmet/update'], { state: this.Hizmet })

    }
  }
}
