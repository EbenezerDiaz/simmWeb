import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from '../model/loginRequest.model'

//Configurción
import { AppConfig } from '../app.config';

/**
 * Servicio encargado de iniciar sesi&oacute;n con el WS de Java y de obtener todos los datos del usuario.
 * 
 * @author Jesus Alfredo Hernandez Orozco.
 */
@Injectable()
export class AuthenticationService {

    public loginRequest : LoginRequest;

    /**
     * Constructor de la clase.
     * 
     * @param http Inyecci&oacute;n de los servicios de HTTP.
     * @param config Inyecci&oacute;n del archivo de configuraci&oacute;n para poder diferenciar los diferentes entornos de desarrollo.
     */
    constructor(
		public http: HttpClient,
		private config: AppConfig
	) {
        this.loginRequest = new LoginRequest("","");
		this.loadUrl();
    }
    
    private host:String;
	private port:String;

    /**
     * Carga de acuerdo al archivo de configuraci&oacute;n, el host y el puerto para el entorno donde se esta desarrollando.
     */
	public loadUrl(){
		this.host = this.config.getConfig('host');
		this.port = this.config.getConfig('port');
	}

    /**
     * Servicio que se utiliza para hacer login y obtener el JWT
     * 
     * @param ussername usuario ingresado en la pantalla de Login.
     * @param password password ingresado en la pantalla de Login.
     */
    public authenticate(ussername: string, password: string): Observable<any> {

        this.loginRequest.usernameOrEmail=ussername;
        this.loginRequest.password=password;
        let url:string = 'http://'+this.host+':'+this.port;
        return this.http.post(
            url+'/auth/signin/', 
            {usernameOrEmail: ussername, password: password}, 
            {headers:new HttpHeaders({
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':url
            }),responseType:'text'}
        );
    }

    isSignedIn(): boolean {
        return localStorage.getItem('jwt') !== null;
    }

    /**
     * @returns Falso si no tiene permiso
     */
    public isActive(): boolean {
        return false;
    }
}