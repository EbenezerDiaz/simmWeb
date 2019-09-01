import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UsuarioComponent } from './component/usuario.component';
import { PantallaUnoComponent } from './component/pantallaUno.component';
import { LoginComponent } from './component/login.component';

import { Interceptor } from './security/app.interceptor';
import { TokenStorage } from './security/token.storage';
import { AuthenticationService } from './security/auth.service';

//Configuración del Routing:
import { routing, appRoutingProviders } from './app.routing';

//Importación de cliente para servicios REST:
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

//Librería para trabajar con JWT:
import { JwtModule } from '@auth0/angular-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';

//Utils
import { WINDOW_PROVIDERS } from './utils/window.util';
import { CacheInterceptor } from './utils/cacheInterceptor.util';

//Para config
import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './app.config';
import { HttpModule } from '@angular/http';
import { UsuarioGuard } from './guards/usuario.guard';
@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    PantallaUnoComponent,
    LoginComponent
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        }
      }
    }),
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    HttpModule,
    routing,
  ],
  providers: [
    AppConfig,
    UsuarioGuard,
    appRoutingProviders,
    Interceptor,
    AuthenticationService,
    TokenStorage,
    JwtHelperService,
    WINDOW_PROVIDERS,
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
