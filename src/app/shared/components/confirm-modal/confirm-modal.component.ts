import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  @Input() confirmationBoxTitle;
  @Input() confirmationMessage;

  /**
   *
   */
  constructor(public activeModal: NgbActiveModal,) {

  }
  selected: any;

  close() {

    this.activeModal.close(this.selected)

  }
}
