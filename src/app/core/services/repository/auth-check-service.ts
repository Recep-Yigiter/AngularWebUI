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
    const token: string = localStorage.getItem("token");
    let expired: any;

    try {
      expired = this.jwtHelperService.isTokenExpired(token);
    } catch {
      expired = true;
    }

    if (_isAuthenticated == undefined) {
      if (token && !expired) {
        _isAuthenticated = true;

      }
    }
    else {
      _isAuthenticated = token != null && !expired
    }

  }

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }


}

export let _isAuthenticated: boolean;