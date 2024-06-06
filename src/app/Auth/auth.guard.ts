import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthCheckService, _isAuthenticated } from 'src/app/core/services/auth-check.service';
import { AuthService } from 'src/app/core/services/repository/Auth.service';


// @Injectable({
//   providedIn: 'root'
// })
// export class authGuard implements CanActivate, CanActivateChild {

//   constructor(private router: Router, private authSerVice: AuthService, private authCheckService: AuthCheckService) {


//   }
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {



//     this.authCheckService.identityCheck();
//     if (!_isAuthenticated) {
//       this.router.navigate(["login"], { queryParams: { returnUrl: state.url } })
//     }

//     return true;
//   }


//   canActivateChild(
//     childRoute: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }

// }



export const authGuard: CanActivateFn = (route, state) => {

  let router = inject(Router);
  let authService = inject(AuthService);
  let authCheckService = inject(AuthCheckService);

  authCheckService.identityCheck();
  if (!_isAuthenticated) {
    router.navigate(["login"], { queryParams: { returnUrl: state.url } })
  }
  return true;
}
