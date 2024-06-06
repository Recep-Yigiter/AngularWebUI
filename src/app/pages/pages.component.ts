import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private Router: Router, private JwtHelperService: JwtHelperService) {

  }
  admin: boolean = false;
  authorization: any;
  ngOnInit(): void {


    const tokenData = JSON.parse(localStorage.getItem("tokenData"));
    const tokenDecode = this.JwtHelperService.decodeToken(tokenData.jwtToken);
    this.authorization = {
      email: tokenDecode[Object.keys(tokenDecode).filter(x => x.endsWith("/emailaddress"))[0]] ,
      name: tokenDecode[Object.keys(tokenDecode).filter(x => x.endsWith("/name"))[0]],
      surname:tokenDecode[Object.keys(tokenDecode).filter(x => x.endsWith("/surname"))[0]] ,
      tenant:tokenDecode.tenant 
    }

console.log(tokenDecode);
    if (this.authorization.email == "admin.root@yukselis.com" &&this.authorization.tenant=="root") {
      this.admin = true
    }
  }


  stokRouter() {
    this.Router.navigate(['/stok/list'])
  }
  satinalmaRouter() {
    this.Router.navigate(['/satinalma'])
  }
  satisRouter() {
    this.Router.navigate(['/satis'])
  }
  uretimRouter() {

  }
  finansRouter() {

  }
  faturaRouter() {
    this.Router.navigate(['/fatura'])
  }
  irsaliyeRouter() {
    this.Router.navigate(['/irsaliye'])
  }




  cikis() {
    localStorage.removeItem("tokenData");
    localStorage.removeItem("refreshToken");
    this.Router.navigate(['/login'])
  }

}
