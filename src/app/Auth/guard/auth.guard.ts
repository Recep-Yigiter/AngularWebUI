import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/repository/Auth.service';
import { AuthCheckService, _isAuthenticated } from 'src/app/core/services/repository/auth-check-service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private authSerVice: AuthService,private authCheckService:AuthCheckService) {


  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    


      this.authCheckService.identityCheck();
      if (!_isAuthenticated) {
        this.router.navigate(["login"], { queryParams: { returnUrl: state.url } })
      }

   return true;
  }

  
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}
