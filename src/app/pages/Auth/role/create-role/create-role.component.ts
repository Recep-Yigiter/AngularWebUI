import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from 'src/app/core/services/repository/role.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent  {


  @Input() confirmationBoxTitle;
  @Input() confirmationMessage;
  constructor(public activeModal: NgbActiveModal, private RoleService: RoleService) {



  }

  loginObj: any = {
    name: "",
    description: ""
  }

 async Kaydet() {

 await this.RoleService.create(this.loginObj, () => {
  this.activeModal.close();
  })
  }

}


