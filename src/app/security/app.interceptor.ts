
import {tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {TokenStorage} from './token.storage';


const TOKEN_HEADER_KEY = 'Authorization';

/**
 * Intercepta todas las peticiones y agrega el token de autorizaci&oacute;n al encabezado. Tambi&eacute;n intercepta 
 * cualquier petici&oacute;n no autorizada y lo redirecciona a la p&aacute;gina de login.
 * 
 * @author Jesus Alfredo Hernandez Orozco
 */
@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(
      private token: TokenStorage, 
      private router: Router) 
      { }

  intercept(peticion: HttpRequest<any>, next: HttpHandler): Observable<HttpUserEvent<any>> {
    let peticionAutorizacion = peticion;
    if (this.token.getToken() != null) {
        peticionAutorizacion = peticion.clone({ headers: peticion.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this .token.getToken())});
    }
    return next.handle(peticionAutorizacion).pipe(tap(
        (err: any) => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
                this.router.navigate(['login']);
            }
        }
    ));
  }
}