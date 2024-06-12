import { Component } from '@angular/core';
import { ModalAlert } from '../../../core/models/alert/modal-alert';
import { AlertService } from '../../../core/services/alert.service';
import  Swal from 'sweetalert2';


@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent {
  alert: ModalAlert;

  constructor(private alertService: AlertService) { }

  ngOnInit() {

    // this.alertService.alertOccured.subscribe( (alert: ModalAlert) => {

    //       if (alert) {
          
    //         this.alert = alert;
    //          Swal.fire(this.alert.title, this.alert.message, "error")
            
    //       }
    //     }
    //   );
  }
}

