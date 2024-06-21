import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
          this.errorMessage = 'Invalid email or password.';
        } else if (error.status === 500) {
          this.errorMessage =
            'Your account is not activated. Please check your email for the activation link.';
        } else if (error.status === 404) {
          this.errorMessage = 'User not found.';
        } else {
          this.errorMessage =
            'An unexpected error occurred. Please try again later.';
        }
      }
    );
  }
}
