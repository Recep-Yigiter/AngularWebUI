import { Subject } from "rxjs";
import { ModalAlert } from "../models/alert/modal-alert";
import { AlertType } from "../models/alert/alert-type";
import Swal from 'sweetalert2'

export class AlertService {
  alertOccured = new Subject();


  handleError(alert: any) {

    let ifObject = ""
    if (typeof (alert.errorMessage) == typeof (ifObject)) {
      Swal.fire({
        title: alert.title,
        text: alert.errorMessage,
        icon: 'error',
        confirmButtonText: 'Tamam'

      })
    }
    else {

      let template = [];
      for(let item of alert.errorMessage){

      //  template.push(`<span style=' display:flex; position:absolute;font-family:Monospace; font-size:16px;'>- ${item} </span> <br> `)
       template.push(`<span style=' display:flex; position:absolute;font-family:cursive; font-size:16px;'>- ${item} </span> <br> `)
      }
  
      Swal.fire({

        title: alert.title,
        html: template.join(' '),
        icon: 'error',
        confirmButtonText: 'Tamam'

      })

    }



  }

  handleSuccess(alert: any) {
    const alertData = new ModalAlert(alert.title, alert.message, AlertType.success);
    this.alertOccured.next(alertData);
  }
}