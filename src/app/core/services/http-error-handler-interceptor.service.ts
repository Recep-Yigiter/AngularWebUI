

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, firstValueFrom, Observable, of } from 'rxjs';
import { ApiClientService } from 'src/app/core/services/api-client.service';
import { AuthService } from './repository/Auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HtppErrorHandlerInterceptorService {
  cloneRequest:any;
  constructor(
    private authService: AuthService,
    private jwtHelperService:JwtHelperService,
    private router:Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    var tokenData:any = localStorage.getItem("tokenData");
    const loggedUserData:any=JSON.parse(tokenData)
 

    if (loggedUserData) {
      const expired:any = this.jwtHelperService.isTokenExpired(loggedUserData.jwtToken);

      if (expired==true) {
         console.log("Token is Expired");
         localStorage.removeItem("tokenData")
         this.router.navigate(['/login'])
         
      }
      this.cloneRequest = req.clone({ 

        setHeaders: {
          Authorization: `Bearer ${loggedUserData.jwtToken}`,
        }
      })
    }
    else{
      this.cloneRequest = req.clone({ 

        setHeaders: {
          Authorization: `Bearer ${null}`,
        }
      })
    }


    return next.handle(this.cloneRequest).pipe(catchError(error => {

      switch (error.status) {

        case HttpStatusCode.Unauthorized://401
console.log(error);

          break;


        case HttpStatusCode.InternalServerError://500
        console.log(error);
          break;


        case HttpStatusCode.BadRequest://400
        console.log(error);
          break;


        case HttpStatusCode.NotFound: //404
        console.log(error);
          break;


        default:
          console.log(error);
          break;
      }

      return of(error)
    }))

  }



}





















// import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptorFn, HttpRequest, HttpStatusCode } from '@angular/common/http';
// import { Injectable, inject } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { catchError, firstValueFrom, Observable, of, throwError } from 'rxjs';
// import { ApiClientService } from 'src/app/core/services/api-client.service';
// import { AuthService } from './repository/Auth.service';


// export const HtppErrorHandlerInterceptorService:HttpInterceptorFn=(req,next)=>{

// const authService=inject(AuthService)


//   let loggedUserData:any ;
//   const tokenData = localStorage.getItem("tokenData")
  
//   if (tokenData != null) {
//     loggedUserData = JSON.parse(tokenData)
//   }
//   const cloneRequest = req.clone({ 

//     setHeaders: {
//       Authorization: `Bearer ${loggedUserData.jwtToken}`,
//       tenant:"root"
//     }
//   }) 

//   return next(cloneRequest).pipe(
//     catchError((error:HttpErrorResponse)=>{


//       if (error.status===401) {
//         const isRefresh=confirm("Your Session is Expired. Do you want to Continue");
//         if (isRefresh) {
//           authService.$refreshToken.next(true)
//         }
//       }


//       return throwError(error)
//     })
//   )


// }





















