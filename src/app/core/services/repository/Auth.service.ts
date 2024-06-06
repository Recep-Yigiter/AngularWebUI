import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { ApiClientService } from 'src/app/core/services/api-client.service';


@Injectable({
    providedIn: 'root',
    
})
export class AuthService {

    public $refreshToken:Subject<any>;
    constructor(
        private apiService: ApiClientService,
        private jwtHelperService: JwtHelperService,
     ) {

     }

    public redirectUrl: string;

    async login(login: any, successCallBack?: (res) => void, errorCallback?: (errorMessage: string) => void) {

        const headers = new HttpHeaders({ 'tenant': `${login.tenant}` });
        const observable = this.apiService.post({
            controller: "Tokens",
            action: "login",
            headers: headers
        }, login)

        const promiseData = firstValueFrom(observable);
        promiseData.then(successCallBack).catch(errorCallback);
        return await promiseData;
    }

    async refreshToken( successCallBack?: (res) => void, errorCallback?: (errorMessage: string) => void) {

        var tokenData:any = localStorage.getItem("tokenData");
        const loggedUserData:any=JSON.parse(tokenData)
     
        const obj={
            "currentJwtToken": loggedUserData.jwtToken,
            "currentRefreshToken": loggedUserData.refreshToken
          }
        // const headers = new HttpHeaders({ 'tenant': `${login.tenant}` });
        const observable = this.apiService.post({
            controller: "Tokens",
            action: "refresh",

        }, obj)

        const promiseData = firstValueFrom(observable);
        promiseData.then(successCallBack).catch(errorCallback);
        return await promiseData;
    }



}




