import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/core/services/repository/user.service';
import { UserRolesComponent } from './user-roles/user-roles.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  /**
   *
   */
  constructor(private UserService: UserService, private modalService: NgbModal) {


  }
  users: any;
  async ngOnInit() {
    this.getUsers()
  }


  async getUsers() {
    this.users = (await this.UserService.list()).data
  }
  rolAta(item) {
    const modalRef = this.modalService.open(UserRolesComponent, { size: 'md', backdrop: 'static' });
    modalRef.componentInstance.user = item;

    modalRef.result.then(() => {


    });
  }
  profile(item){
    console.log(item);
  }

}
