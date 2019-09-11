import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UsuarioComponent } from './component/usuario.component';
import { Pantalla1Component } from './component/pantalla1.component';
import { Pantalla4Component } from './component/pantalla4.component';
import { Pantalla5Component } from './component/pantalla5.component';
import { Pantalla6Component } from './component/pantalla6.component';
import { Pantalla7Component } from './component/pantalla7.component';
import { Pantalla8Component } from './component/pantalla8.component';
import { LoginComponent } from './component/login.component';
import { UsuarioGuard } from './guards/usuario.guard';

const appRoutes: Routes = [
    {path: 'usuario', component: UsuarioComponent,  canActivate: [UsuarioGuard]},
    {path: 'pantalla1', component: Pantalla1Component},
    {path: 'pantalla4', component: Pantalla4Component},
    {path: 'pantalla5', component: Pantalla5Component},
    {path: 'pantalla6', component: Pantalla6Component},
    {path: 'pantalla7', component: Pantalla7Component},
    {path: 'pantalla8', component: Pantalla8Component},
    {path: 'login', component: LoginComponent},
    {path: '', component: AppComponent}
];

export const appRoutingProviders :any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);