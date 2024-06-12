import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiClientService } from 'src/app/core/services/api-client.service';


@Injectable({
  providedIn: 'root'
})
export class StokService {
  decode: any;
  loggedUserData:any;
  constructor(
    private apiService: ApiClientService,
    private jwtHelperService: JwtHelperService

  ) {

  }

  async create(create: any, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
     



    const observable = this.apiService.post({
      controller: "Stoks",
      action: "Add",
       
    }, create)

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }
  async update(update: any, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
     


    const observable = await this.apiService.put({
      controller: "Stoks",
      action: "update",
       
    }, update)
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);
    return await promiseData;
  }
  async delete(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
     


    const observable = await this.apiService.delete({
      controller: "Stoks",
      queryString: "id=" + `${id}`,
       
    })
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);
    return await promiseData;
  }
  async GetList(successCallBack?: () => void, errorCallBack?: (errorMessage: HttpErrorResponse) => void) {
      
    const observable: Observable<any> = this.apiService.get(
      {
        controller: "Stoks",
        action: "GetList",
         
      });
    const promiseData = firstValueFrom(observable);

    promiseData.then(successCallBack).catch(errorCallBack);

    return await promiseData;
  }

  async GetListTreeView(successCallBack?: () => void, errorCallBack?: (errorMessage: HttpErrorResponse) => void) {
     
    const observable: Observable<any> = this.apiService.get(
      {
        controller: "Stoks",
        action: "GetListTreeView",
         
      });
    const promiseData = firstValueFrom(observable);

    promiseData.then(successCallBack).catch(errorCallBack);

    return await promiseData;
  }
  async getById(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
     
    const observable = this.apiService.get({
      controller: "Stoks",
      action: "GetById/" + `${id}`,
       
    })

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }
  async getByHourId(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
     


    const observable: Observable<any> = this.apiService.get({
      controller: "Stoks",
      action: "GetByHourId/" + `${id}`,
       
    })

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }
  async getCode(durum: boolean, successCallBack?: () => void, errorCallBack?: (errorMessage: HttpErrorResponse) => void) {
     


    const observable = this.apiService.get<{ kod: any }>(
      {
        controller: "Stok",
        action: "GetCode",
        queryString: `Durum=${durum}`,
         
      });

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallBack);

    return await promiseData;
  }












}





