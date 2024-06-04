import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiClientService } from 'src/app/core/services/api-client.service';


@Injectable({
  providedIn: 'root'
})
export class SiparisHareketService {
  decode: any;
  constructor(
    private apiService: ApiClientService,
    private jwtHelperService: JwtHelperService

  ) {
    
    let token = localStorage.getItem("token")
    this.decode = this.jwtHelperService.decodeToken(token);

  }

  async create(create: any, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
        let headers = new HttpHeaders({'tenant':`${this.decode.tenant}`}).set('Authorization',`Bearer ${localStorage.getItem('token')}`).set('Content-Type', 'application/json');
 


    const observable = this.apiService.post({
      controller: "SiparisHarekets",
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
      controller: "SiparisHarekets",
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
      controller: "SiparisHarekets",
      queryString: "id=" + `${id}`,
      headers: headers
    })
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);
    return await promiseData;
  }
  async GetList(successCallBack?: () => void, errorCallBack?: (errorMessage: HttpErrorResponse) => void) {
    let headers = new HttpHeaders({'tenant':`${this.decode.tenant}`}).set('Authorization',`Bearer ${localStorage.getItem('token')}`).set('Content-Type', 'application/json');
    const observable: Observable<any> = this.apiService.get(
      {
        controller: "SiparisHarekets",
        action: "GetList",
        headers: headers
      });
    const promiseData = firstValueFrom(observable);

    promiseData.then(successCallBack).catch(errorCallBack);

    return await promiseData;
  }
  
  async GetListTreeView(successCallBack?: () => void, errorCallBack?: (errorMessage: HttpErrorResponse) => void) {
    let headers = new HttpHeaders({'tenant':`${this.decode.tenant}`}).set('Authorization',`Bearer ${localStorage.getItem('token')}`).set('Content-Type', 'application/json');
    const observable: Observable<any> = this.apiService.get(
      {
        controller: "SiparisHarekets",
        action: "GetListTreeView",
        headers: headers
      });
    const promiseData = firstValueFrom(observable);

    promiseData.then(successCallBack).catch(errorCallBack);

    return await promiseData;
  }
  async getById(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
    let headers = new HttpHeaders({'tenant':`${this.decode.tenant}`}).set('Authorization',`Bearer ${localStorage.getItem('token')}`).set('Content-Type', 'application/json');
    const observable = this.apiService.get({
      controller: "SiparisHarekets",
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
      controller: "SiparisHarekets",
      action: "GetByHourId/" + `${id}`,
      headers: headers
    })

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }

  async  GetCode(successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    let headers = new HttpHeaders({'tenant':`${this.decode.tenant}`}).set('Authorization',`Bearer ${localStorage.getItem('token')}`).set('Content-Type', 'application/json');
 

    const observable = this.apiService.get<any>(
        {
            controller: "SiparisHarekets",
            action: "GetCode",
            headers: headers
        });
    const promiseData = firstValueFrom(observable);

    promiseData.then(successCallBack).catch(errorCallBack);

    return await promiseData;
}










}





