import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/usuario.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorage } from '../security/token.storage';
import { AuthenticationService} from '../security/auth.service';

@Component({
  selector: 'app-pantalla-uno',
  templateUrl: '../views/pantalla1.html',
  styleUrls: ['../styles/pantalla1.css']
})
export class PantallaUnoComponent {

  constructor(
    private token: TokenStorage,
    private jwtHelperService: JwtHelperService
  )
    {
  }
}