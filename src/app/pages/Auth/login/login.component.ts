import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/services/repository/Auth.service';
import { UserService } from 'src/app/core/services/repository/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  msgs1: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private UserService:UserService
  
  ) {

  }
  
  ngOnInit(): void {

  }








  loginObj: any = {
    "tenant": "",
    "email": "",
    "password": ""
  }



  async login() {

    this.spinner.show("spinner-1")

    this.authService.login(this.loginObj,async ( res) => {

      localStorage.setItem("tokenData", JSON.stringify(res.data));


      let token = JSON.parse(localStorage.getItem('tokenData'));
      let user= (await this.UserService.getById(token.userId, () => {})).data;
      localStorage.setItem("user", JSON.stringify(user));


      if (this.authService.redirectUrl) {
        this.router.navigate([this.authService.redirectUrl])
      }
      else {
        this.router.navigate([""])

      }
      this.spinner.hide("spinner-1")

    }, (error: HttpErrorResponse) => {

      // this.msgs1 = [ { severity: 'error', summary: 'Error', detail:error.message }];
      this.spinner.hide("spinner-1")
    })

  }



}
