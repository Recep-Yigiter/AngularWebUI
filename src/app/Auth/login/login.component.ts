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
    private fb: FormBuilder,
    private router: Router) {


  }

  public frm: FormGroup = this.fb.group({

    tenant: [null],
    email: [null],
    password: [null],

  })
  get tenant() { return this.frm.get('tenant') }
  get email() { return this.frm.get('email') }
  get password() { return this.frm.get('password') }






  async login() {

    // this.frm.value.email = "admin.root@yukselis.com"
    // this.frm.value.password = "yukselis001@root"
    let loginModel = Object.assign({}, this.frm.value);

     this.authService.login(loginModel, (res) => {

      localStorage.setItem("token", res.data.jwtToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      
      if (this.authService.redirectUrl) {
        this.router.navigate([this.authService.redirectUrl])
      }
      else {
        this.router.navigate([""])

      }

    })

  }
}
