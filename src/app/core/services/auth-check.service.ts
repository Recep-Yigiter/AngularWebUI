import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthCheckService {
  resultObj: any;
  constructor(private jwtHelperService: JwtHelperService, private router: Router) {



  }

  role: any;
  identityCheck() {

    const tokenData: string = localStorage.getItem("tokenData");
    if (tokenData) {
      const token = JSON.parse(tokenData).jwtToken
  
   
    let expired: any;



    if (_isAuthenticated == undefined) {
      
      if (token ) {
        _isAuthenticated = true;

      }
    }
    else {
      _isAuthenticated = token != null 
    }

  }


  }
  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
}

export let _isAuthenticated: boolean;