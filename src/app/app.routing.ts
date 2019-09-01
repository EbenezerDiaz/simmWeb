import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UsuarioComponent } from './component/usuario.component';
import { PantallaUnoComponent } from './component/pantallaUno.component';
import { LoginComponent } from './component/login.component';
import { UsuarioGuard } from './guards/usuario.guard';

const appRoutes: Routes = [
    {path:'usuario', component: UsuarioComponent,  canActivate: [UsuarioGuard]},
    {path:'pantalla1', component: PantallaUnoComponent},
    {path:'login', component: LoginComponent},
    {path:'', component: AppComponent}
];

export const appRoutingProviders :any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);