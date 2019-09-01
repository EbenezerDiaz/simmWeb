import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/usuario.model';
import { TokenStorage } from '../security/token.storage';
import { AuthenticationService} from '../security/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: '../views/login.html',
  styleUrls: ['../styles/login.css']
})
export class LoginComponent {

  title = 'app';

  public submitted = false;
  public usuario : User;
  public registerForm: FormGroup;

  constructor(
    private router: Router, 
    private token: TokenStorage,
    private formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService
  ) {
    this.usuario = new User(0,"","","","",[]);
  }
  
  loginForm: FormGroup;
  invalidLogin: boolean = false;

  onSubmit() {
    console.log("entra. usuario: "+this.usuario.username+". Contraseña: "+this.usuario.password);
    if (this.loginForm.invalid) {
      return;
    } else {
      this._authenticationService.authenticate(this.usuario.username, this.usuario.password).subscribe(
        result => {
          console.log(JSON.parse(JSON.stringify(result)));
          this.token.saveToken(result);
          this.router.navigate(['usuario']);

        }, error => {
          console.log("JAHO - No se pudo obtener el Token: ");
          console.log(<any>error);
        }
      );
    }
  }

  ngOnInit() {
    window.sessionStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }
}