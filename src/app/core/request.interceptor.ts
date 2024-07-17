import { ErrorHandler, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private jwtHelperService: JwtHelperService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = JSON.parse(localStorage.getItem("tokenData"))


    if (token) {
      const decode = this.jwtHelperService.decodeToken(token.jwtToken);
      const newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token.jwtToken}`,
          tenant: `${decode.tenant}`
        },

      })

      return next.handle(newRequest);
    }

    return next.handle(request)
  }
}
