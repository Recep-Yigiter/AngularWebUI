

import {  HttpEvent, HttpHandler,  HttpRequest, HttpStatusCode } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

import { catchError,  Observable, of } from 'rxjs';
import { AlertService } from './services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class HtppErrorHandlerInterceptor  {
  cloneRequest:any;
  constructor(private alertService:AlertService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



    return next.handle(req).pipe(catchError(error => {

      switch (error.status) {

        case HttpStatusCode.Unauthorized://401

        this.alertService.handleError({
            title: "Unauthorized",
            errorMessage: error.error.Messages[0]
        });
          break;


        case HttpStatusCode.InternalServerError://500
        this.alertService.handleError({
            title: "Internal Server Error",
            errorMessage: error.error.Messages[0]
        });
          break;


        case HttpStatusCode.BadRequest://400
     
        this.alertService.handleError({
            title: "Bad Request",
            errorMessage: error.error.messages
        });
          break;


        case HttpStatusCode.NotFound: //404
        this.alertService.handleError({
            title: "Not Found",
            errorMessage: error.error.Messages[0]
        });
          break;


        default:
         
            this.alertService.handleError({
                title: "Hata Oluştu",
                errorMessage: error.message
            });
                 
          break;
      }

      return of(error)
    }))

  }


}















