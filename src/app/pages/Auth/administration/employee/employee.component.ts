import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/repository/user.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  /**
   *
   */
  constructor(private UserService:UserService) {
  
    
  }
  users:any;
 async ngOnInit() {

this.getUsers()
  
  }


 async getUsers(){
    this.users=(await this.UserService.list()).data
  }
}
