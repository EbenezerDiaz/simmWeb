
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable()
export class AppConfig {

    private config: Object = null;
    private env:    Object = null;

    constructor(private http: HttpClient ) {

    }

    /**
     * Obtiene la infornación encontrada en el primer archivo(config file)
     */
    public getConfig(key: any) {
        return this.config[key];
    }

    /**
     * Obtiene la información encontrada en el segundo archivo (env file)
     */
    public getEnv(key: any) {
        return this.env[key];
    }

    /**
     * Función:
     *   a) Carga el archivo "env.json" para obtener el ambiente (e.g.: 'production', 'development')
     *   b) Carga el archivo "config.[env].json" para obtener todas las variables de entorno (e.g.: 'config.development.json')
     */
    public load() {
        return new Promise((resolve, reject) => {
            this.http.get<any>('./assets/config/env.json').subscribe( (envResponse) => {
                this.env = envResponse;
                let request:any = null;

                switch (envResponse.env) {
                    case 'production': {
                        request = this.http.get('./assets/config/config.' + envResponse.env + '.json');
                    } break;

                    case 'development': {
                        request = this.http.get('./assets/config/config.' + envResponse.env + '.json');
                    } break;

                    case 'default': {
                        console.error('Environment file is not set or invalid');
                        resolve(true);
                    } break;
                }

                if (request) {
                    request.subscribe((responseData) => {
                            this.config = responseData;
                            resolve(true);
                        });
                } else {
                    console.error('Env config file "env.json" is not valid');
                    resolve(true);
                }
            });

        });
    }
}