import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiClientService } from 'src/app/core/services/api-client.service';


@Injectable({
    providedIn: 'root'
})
export class HizmetService {

    constructor( private apiService: ApiClientService, ) { }

    async create(create: any, successCallBack?: () => void, errorCallback?: (errorMessage: string) => void) {

        const observable = this.apiService.post({
            controller: "Hizmets",
            action: "Add"
        }, create)

        const promiseData = firstValueFrom(observable);
        promiseData.then(successCallBack).catch(errorCallback);

        return await promiseData;
    }
    async update(update: any, successCallBack?: () => void, errorCallback?: (errorMessage: string) => void) {
        const observable = await this.apiService.post({
            controller: "Hizmets",
            action: "Update"
        }, update)
        const promiseData = firstValueFrom(observable);
        promiseData.then(successCallBack).catch(errorCallback);
        return await promiseData;
    }


     delete(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: string) => void) {
    
        const observable =  this.apiService.post({
            controller: "Hizmets",
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
                controller: "Hizmets",
                action: "GetList"
            });
        const promiseData = firstValueFrom(observable);

        promiseData.then(successCallBack).catch(errorCallBack);

        return await promiseData;
    }

    async GetListTreeView(successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
        const observable: Observable<any> = this.apiService.get(
            {
                controller: "Hizmets",
                action: "GetListTreeView"
            });
        const promiseData = firstValueFrom(observable);

        promiseData.then(successCallBack).catch(errorCallBack);

        return await promiseData;
    }
    async getById(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: string) => void) {
        const observable = this.apiService.get({
            controller: "Hizmets",
            action: "GetById/" + `${id}`
        })

        const promiseData = firstValueFrom(observable);
        promiseData.then(successCallBack).catch(errorCallback);

        return await promiseData;
    }


    
    async getByHourId(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: string) => void) {
        const observable: Observable<any> = this.apiService.get({
            controller: "Hizmets",
            action: "GetByHourId/" + `${id}`
        })

        const promiseData = firstValueFrom(observable);
        promiseData.then(successCallBack).catch(errorCallback);

        return await promiseData;
    }

    async  GetCode(successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
        const observable = this.apiService.get<any>(
            {
                controller: "Hizmets",
                action: "GetCode"
            });
        const promiseData = firstValueFrom(observable);

        promiseData.then(successCallBack).catch(errorCallBack);

        return await promiseData;
    }












}





