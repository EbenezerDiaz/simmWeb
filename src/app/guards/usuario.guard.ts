import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { TokenStorage } from '../security/token.storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenResponse } from '../model/tokenResponse.model';

@Injectable()
export class UsuarioGuard implements CanActivate {

    private ROLE :string = 'PMONAMB02';

    constructor(
        private tokenStorage: TokenStorage, 
        private jwtHelperService: JwtHelperService) {
        }

    canActivate() {
        let tokenRespuesta: TokenResponse = this.jwtHelperService.decodeToken(JSON.parse(this.tokenStorage.getToken()).accessToken);
        if(tokenRespuesta.roles.includes(this.ROLE)){
            console.log("Si tiene permisos");
            return true;
        } else {
            console.log("No tiene permisos");
            return false;
        }
    }
}