import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, firstValueFrom, Observable, of } from 'rxjs';
import { ApiClientService } from 'src/app/core/services/api-client.service';
import { AuthService } from './Auth.service';


@Injectable({
  providedIn: 'root'
})
export class HtppErrorHandlerInterceptorService {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    return next.handle(req).pipe(catchError(error => {

      switch (error.status) {

        case HttpStatusCode.Unauthorized: //401
          var token = localStorage.getItem("token")
          var refreshToken = localStorage.getItem("refreshToken")
          let refresToken = {
            currentJwtToken: token,
            currentRefreshToken: refreshToken
          }
          this.authService.refreshToken(refresToken)
          break;


        case HttpStatusCode.InternalServerError:  //500

          break;


        case HttpStatusCode.BadRequest://400

          break;


        case HttpStatusCode.NotFound: //404

          break;


        default:
          break;
      }





      return of(error)
    }))

  }









}





