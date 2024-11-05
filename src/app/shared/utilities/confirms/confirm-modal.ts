import { Component, Input } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BankaService } from 'src/app/core/services/repository/banka.service';

@Component({
    selector: 'app-delete-modal',
    styleUrls: ['../modal.scss'],
    template: `
<div class="modal-header ">

<h4 class="modal-title">Uyarı! </h4>
<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.close(false)"></button>
</div>

<div class="">

{{confirmationMessage}}

</div>


<div class="modal-footer">

<button type="button" class="btn "  (click)="activeModal.close(false)"
    style="padding:2px 10px; border-radius: 3px; background-color: #fdfdfd; border: 1px solid #e6e6e6;">
    <i class="fa fa-times" style="color: #000; margin-right: 5px; font-weight: 600;"></i>
    <span class="d-none d-sm-inline" style="font-size: 13px;">Tamam</span>
</button>
</div>
  `

})
export class ConfirmModalComponents {
    @Input() confirmationBoxTitle;
    @Input() confirmationMessage;

    constructor(public activeModal: NgbActiveModal) {

    }

    



}

