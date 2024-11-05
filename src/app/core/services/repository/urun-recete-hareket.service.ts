import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiClientService } from 'src/app/core/services/api-client.service';


@Injectable({
  providedIn: 'root'
})
export class UrunReceteHareketService {
  decode: any;
  constructor(
    private apiService: ApiClientService,
    private jwtHelperService: JwtHelperService

  ) {
    
   

  }

  async create(create: any, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
         
 


    const observable = this.apiService.post({
      controller: "UrunReceteHarekets",
      action: "Add",
       
    }, create)

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }
  async update(update: any, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
         
 

    const observable = await this.apiService.put({
      controller: "UrunReceteHarekets",
      action: "update",
       
    }, update)
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);
    return await promiseData;
  }
  async delete(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
         
 

    const observable = await this.apiService.delete({
      controller: "UrunReceteHarekets",
      queryString: "id=" + `${id}`,
       
    })
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);
    return await promiseData;
  }
  async GetList(successCallBack?: () => void, errorCallBack?: (errorMessage: HttpErrorResponse) => void) {
     
    const observable: Observable<any> = this.apiService.get(
      {
        controller: "UrunReceteHarekets",
        action: "GetList",
         
      });
    const promiseData = firstValueFrom(observable);

    promiseData.then(successCallBack).catch(errorCallBack);

    return await promiseData;
  }
  
  async GetListTreeView(successCallBack?: () => void, errorCallBack?: (errorMessage: HttpErrorResponse) => void) {
     
    const observable: Observable<any> = this.apiService.get(
      {
        controller: "UrunReceteHarekets",
        action: "GetListTreeView",
         
      });
    const promiseData = firstValueFrom(observable);

    promiseData.then(successCallBack).catch(errorCallBack);

    return await promiseData;
  }
  async getById(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
     
    const observable = this.apiService.get({
      controller: "UrunReceteHarekets",
      action: "GetById/" + `${id}`,
       
    })

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }
  async getByHourId(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
         
 

    const observable: Observable<any> = this.apiService.get({
      controller: "UrunReceteHarekets",
      action: "GetByHourId/" + `${id}`,
       
    })

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }

  async  GetCode(successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
     
 

    const observable = this.apiService.get<any>(
        {
            controller: "UrunReceteHarekets",
            action: "GetCode",
             
        });
    const promiseData = firstValueFrom(observable);

    promiseData.then(successCallBack).catch(errorCallBack);

    return await promiseData;
}










}





