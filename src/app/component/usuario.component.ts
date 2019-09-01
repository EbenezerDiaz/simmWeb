import {Component, OnInit} from '@angular/core';
import { TokenStorage } from '../security/token.storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenResponse } from '../model/tokenResponse.model';

@Component({
  selector: 'usuario',
  templateUrl: '../views/usuario.html',
  styleUrls: ['../styles/usuario.css']
})

export class UsuarioComponent implements OnInit {
  
  constructor(
    private token: TokenStorage,
    private jwtHelperService: JwtHelperService
  ) 
    {
  }
  ngOnInit(): void {
    console.log("JAHO - Token antes de ser decodificado: ");
    console.log(JSON.parse(this.token.getToken()).accessToken);
    console.log("JAHO - Token despues de ser decodificado: ");
    console.log(this.jwtHelperService.decodeToken(JSON.parse(this.token.getToken()).accessToken));
    let tokenRespuesta: TokenResponse = this.jwtHelperService.decodeToken(JSON.parse(this.token.getToken()).accessToken);
    console.log(tokenRespuesta.roles);
  }
}