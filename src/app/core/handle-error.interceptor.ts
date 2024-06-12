
import { ErrorHandler, Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { AlertService } from "./services/alert.service";
import { Observable, catchError, of } from "rxjs";

@Injectable()
export class HandleErrorInterceptor implements ErrorHandler {
    constructor(private alertService: AlertService) { }

    handleError(error: Error) {
        // this.alertService.handleError({
        //     title: "Hata Oluştu",
        //     errorMessage: error.message
        // });
    }


}