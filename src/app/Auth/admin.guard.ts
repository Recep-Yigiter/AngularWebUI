import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthCheckService, _isAuthenticated } from 'src/app/core/services/auth-check.service';
import { AuthService } from 'src/app/core/services/repository/Auth.service';

export const AdminGuard: CanActivateFn = (route, state) => {


  const jwtHelperService = inject(JwtHelperService)
 
  const tokenData = JSON.parse(localStorage.getItem("tokenData"));
  if (tokenData) {

    const tokenDecode = jwtHelperService.decodeToken(tokenData.jwtToken);

    let authorization = {
      email: tokenDecode[Object.keys(tokenDecode).filter(x => x.endsWith("/emailaddress"))[0]],
      name: tokenDecode[Object.keys(tokenDecode).filter(x => x.endsWith("/name"))[0]],
      surname: tokenDecode[Object.keys(tokenDecode).filter(x => x.endsWith("/surname"))[0]],
      tenant: tokenDecode.tenant
    }

    if (authorization.email == "admin.root@yukselis.com" && authorization.tenant == "root") {
      return true;
    }
  }




  return false;
}
