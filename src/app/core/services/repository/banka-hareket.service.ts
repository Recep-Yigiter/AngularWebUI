import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiClientService } from 'src/app/core/services/api-client.service';


@Injectable({
  providedIn: 'root'
})
export class BankaHareketService {
  decode: any;
  constructor(
    private apiService: ApiClientService,
    private jwtHelperService: JwtHelperService

  ) {
    

  }

  async create(create: any, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
         

    const observable = this.apiService.post({
      controller: "BankaHarekets",
      action: "Add",
       
    }, create)

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }

  async getByIdOrGetList(id: string,successCallBack?: () => void, errorCallBack?: (errorMessage: HttpErrorResponse) => void) {
     
    const observable: Observable<any> = this.apiService.get(
      {
        controller: "BankaHarekets",
        action: "getById/" + `${id}`,
         
      });
    const promiseData = firstValueFrom(observable);

    promiseData.then(successCallBack).catch(errorCallBack);

    return await promiseData;
  }
  










}





