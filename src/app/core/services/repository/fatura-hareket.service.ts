import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiClientService } from 'src/app/core/services/api-client.service';


@Injectable({
    providedIn: 'root'
})
export class FaturaHareketService {

    constructor( private apiService: ApiClientService, ) { }

    async create(create: any, successCallBack?: () => void, errorCallback?: (errorMessage: string) => void) {

        const observable = this.apiService.post({
            controller: "FaturaHarekets",
            action: "Add"
        }, create)

        const promiseData = firstValueFrom(observable);
        promiseData.then(successCallBack).catch(errorCallback);

        return await promiseData;
    }
    async update(update: any, successCallBack?: () => void, errorCallback?: (errorMessage: string) => void) {
        const observable = await this.apiService.post({
            controller: "FaturaHarekets",
            action: "Update"
        }, update)
        const promiseData = firstValueFrom(observable);
        promiseData.then(successCallBack).catch(errorCallback);
        return await promiseData;
    }


     delete(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: string) => void) {
    
        const observable =  this.apiService.post({
            controller: "FaturaHarekets",
            action: "Delete",
            queryString:"id="+`${id}`
        }, id)
        const promiseData = firstValueFrom(observable);
        promiseData.then(successCallBack).catch(errorCallback);
        return  promiseData;
    }


    async GetList(successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
        const observable: Observable<any> = this.apiService.get(
            {
                controller: "FaturaHarekets",
                action: "GetList"
            });
        const promiseData = firstValueFrom(observable);

        promiseData.then(successCallBack).catch(errorCallBack);

        return await promiseData;
    }

    async GetListTreeView(successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
        const observable: Observable<any> = this.apiService.get(
            {
                controller: "FaturaHarekets",
                action: "GetListTreeView"
            });
        const promiseData = firstValueFrom(observable);

        promiseData.then(successCallBack).catch(errorCallBack);

        return await promiseData;
    }
    async getById(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: string) => void) {
        const observable = this.apiService.get({
            controller: "FaturaHarekets",
            action: "GetById/" + `${id}`
        })

        const promiseData = firstValueFrom(observable);
        promiseData.then(successCallBack).catch(errorCallback);

        return await promiseData;
    }


    async getByHourId(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: string) => void) {
        const observable: Observable<any> = this.apiService.get({
            controller: "FaturaHarekets",
            action: "GetByHourId/" + `${id}`
        })

        const promiseData = firstValueFrom(observable);
        promiseData.then(successCallBack).catch(errorCallback);

        return await promiseData;
    }

    async  GetCode(successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
        const observable = this.apiService.get<any>(
            {
                controller: "FaturaHarekets",
                action: "GetCode"
            });
        const promiseData = firstValueFrom(observable);

        promiseData.then(successCallBack).catch(errorCallBack);

        return await promiseData;
    }











}





