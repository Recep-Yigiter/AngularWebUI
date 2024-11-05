import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { ApiClientService } from 'src/app/core/services/api-client.service';


@Injectable({
  providedIn: 'root'
})
export class HareketService {
  decode: any;
  constructor(
    private apiService: ApiClientService,
    private jwtHelperService: JwtHelperService

  ) {



  }


  async getByGrupNameId(grupName: any, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {



    const observable: Observable<any> = this.apiService.get({
      controller: "Harekets",
      action: "getByGrupName/"+`${grupName}` ,
    },)
    
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }



  async create(create: any, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
         
 


    const observable = this.apiService.post({
      controller: "Depos",
      action: "Add",
       
    }, create)

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }









}





