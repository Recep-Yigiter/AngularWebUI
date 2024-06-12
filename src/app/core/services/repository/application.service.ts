import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiClientService } from 'src/app/core/services/api-client.service';


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  decode: any;
  constructor(
    private apiService: ApiClientService,
    private jwtHelperService: JwtHelperService

  ) {
    

  }



  async getAllPermissions(successCallBack?: () => void, errorCallBack?: (errorMessage: HttpErrorResponse) => void) {
   
    const observable: Observable<any> = this.apiService.get(
      {
        controller: "ApplicationServices",
      });
    const promiseData = firstValueFrom(observable);

    promiseData.then(successCallBack).catch(errorCallBack);

    return await promiseData;
  }














}





