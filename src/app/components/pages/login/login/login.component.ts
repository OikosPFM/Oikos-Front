import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const usuarioData = {
      email: this.email,
      contraseña: this.password,
    };
    console.log(usuarioData);
    this.authService.loginUsuario(usuarioData).subscribe(
      (data) => {
        console.log('Login successful', data);
        localStorage.setItem('token', data.token);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login failed', error);
        if (error.status === 401) {
          this.errorMessage = 'Email y/o contraseña incorrectos';
        } else if (error.status === 500) {
          this.errorMessage =
            'Tu cuenta todavía no ha sido activada. El administrador de tu finca tiene que aprobar el registro';
        } else if (error.status === 404) {
          this.errorMessage = 'User not found.';
        } else {
          this.errorMessage =
            'An unexpected error occurred. Please try again later.';
        }
      }
    );
  }

  navigateToForm(event: Event) {
    event.preventDefault();
    this.router.navigate(['/'], { fragment: 'register-form' });
  }
}
