import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/core/models/Auth/login.model';
import { AuthService } from 'src/app/core/services/repository/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  constructor(
    private authService: AuthService,
    private router: Router) {


  }



  loginObj: any = {
    "tenant": "",
    "email": "",
    "password": ""
  }




  async login() {


    this.authService.login(this.loginObj, (res) => {

      localStorage.setItem("tokenData", JSON.stringify(res.data));
      if (this.authService.redirectUrl) {
        this.router.navigate([this.authService.redirectUrl])
      }
      else {
        this.router.navigate([""])

      }

    })

  }



}
