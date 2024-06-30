import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      // Token presente y válido
      // const datos= this.getUserId()
      // return datos;
      return true;
    } else {
      // No hay token, redirige a la página de inicio de sesión
      this.router.navigate(['/login']);
      return false;
    }
  }

  // getUserId(): number | null
  //   {
  //     userId: 25,
  //     rol: "inquilino",
  //   }

  //   {
  //     mensaje: "Hola soy JP",
  //     idUser: "25",
  //     time: "11:11:11"
  //   }
}

/*  */
