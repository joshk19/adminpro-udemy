
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UsuarioService } from "../services/usuario/usuario.service";
import { Usuario } from "../models/usuario.model";
import { environment } from '../../environments/environment';


declare function init_plugins();
declare const gapi: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  ambiente: string;
  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(public router: Router, public _usuarioService: UsuarioService) {}

  ngOnInit() {
    // this.ambiente = environment.message;
    this.ambiente = environment.config.message;
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem("email") || "";
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          "1066461705734-dqr54ulbspn33jthui7rq5lvl6t9smlc.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin",
        scope: "profile email"
      });

      this.attachSignin(document.getElementById("btnGoogle"));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      
      //Obtiene los datos del usuario
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle( token ).subscribe( () => window.location.href = '#/dashboard');
    });
  }

  ingresar(forma: NgForm) {
    console.log(forma.valid);
    if (!forma.valid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService
      .login(usuario, forma.value.recuerdame)
      .subscribe(correcto => this.router.navigate(["/dashboard"]));
  }
}
