import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { join } from '@fireflysemantics/join';
import { TokenStorageService } from './token.service';
import { environment } from '../../environments/environment'
import { ClientTokenStorageService } from './client/client.token.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService{
    private REST_API_SERVER: string = environment.apiUrl;
    private _baseRoute: string;
    private tokenService = new TokenStorageService();

    constructor(private httpClient: HttpClient, private clientTokenService: ClientTokenStorageService) { 
        this._baseRoute = "";
    }

    public sendGetRequest(){
        return this.httpClient.get(this.REST_API_SERVER);
    }

    public get baseRoute(){
        return this._baseRoute;
    }

    public set baseRoute(newBaseRoute: string){
        this._baseRoute = newBaseRoute;
    }

    public getFullApiUrl(route = ''){
        return join(this.REST_API_SERVER, this._baseRoute, route);
    }

    public createSession(user: any){
        this.tokenService.saveUser(user);
        this.tokenService.saveToken(user.token);
    }

    public createClientSession(client: any){
        this.clientTokenService.saveUser(client);
        this.clientTokenService.saveToken(client.token);
    }

    public get(route?: string){
        return this.httpClient.get(this.getFullApiUrl(route));
    }

    public post(route: string, data : any){
        return this.httpClient.post(this.getFullApiUrl(route), data);
    }
}