import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiClientService } from 'src/app/core/services/api-client.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  decode: any;
  constructor(
    private apiService: ApiClientService,
   

  ) {
    

  }

  async create(create: any, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
        let headers = new HttpHeaders({'tenant':`${this.decode.tenant}`}).set('Authorization',`Bearer ${localStorage.getItem('token')}`).set('Content-Type', 'application/json');
 


    const observable = this.apiService.post({
      controller: "Users",
      action: "Add",
      headers: headers
    }, create)

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }
  async update(update: any, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
        let headers = new HttpHeaders({'tenant':`${this.decode.tenant}`}).set('Authorization',`Bearer ${localStorage.getItem('token')}`).set('Content-Type', 'application/json');
 

    const observable = await this.apiService.put({
      controller: "Users",
      action: "update",
      headers: headers
    }, update)
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);
    return await promiseData;
  }
  async delete(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
        let headers = new HttpHeaders({'tenant':`${this.decode.tenant}`}).set('Authorization',`Bearer ${localStorage.getItem('token')}`).set('Content-Type', 'application/json');
 

    const observable = await this.apiService.delete({
      controller: "Users",
      queryString: "id=" + `${id}`,
      headers: headers
    })
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);
    return await promiseData;
  }
  async list(successCallBack?: () => void, errorCallBack?: (errorMessage: HttpErrorResponse) => void) {
    const observable: Observable<any> = this.apiService.get(
      {
        controller: "Users",
        action: "all",
   
      });
    const promiseData = firstValueFrom(observable);

    promiseData.then(successCallBack).catch(errorCallBack);

    return await promiseData;
  }
  async getById(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
        let headers = new HttpHeaders({'tenant':`${this.decode.tenant}`}).set('Authorization',`Bearer ${localStorage.getItem('token')}`).set('Content-Type', 'application/json');
 

    const observable = this.apiService.get({
      controller: "Users",
      action: "GetById/" + `${id}`,
      headers: headers
    })

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }
  async getByHourId(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
        let headers = new HttpHeaders({'tenant':`${this.decode.tenant}`}).set('Authorization',`Bearer ${localStorage.getItem('token')}`).set('Content-Type', 'application/json');
 

    const observable: Observable<any> = this.apiService.get({
      controller: "Users",
      action: "GetByHourId/" + `${id}`,
      headers: headers
    })

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }
  async getCode(durum: boolean, successCallBack?: () => void, errorCallBack?: (errorMessage: HttpErrorResponse) => void) {
        let headers = new HttpHeaders({'tenant':`${this.decode.tenant}`}).set('Authorization',`Bearer ${localStorage.getItem('token')}`).set('Content-Type', 'application/json');
 

    const observable = this.apiService.get<{ kod: any }>(
      {
        controller: "User",
        action: "GetCode",
        queryString: `Durum=${durum}`,
        headers: headers
      });

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallBack);

    return await promiseData;
  }












}





