import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  name = '';
  role = 'User';
  errorMessage = '';
  isRegisterMode = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    this.http.post<any>('https://starstable-api2.azurewebsites.net/api/auth/login', {
      email: this.email,
      pass: this.password,
    }).subscribe({
      next: (response) => {
        console.log('Login success, token:', response.results.access_token);
        localStorage.setItem('token', response.results.access_token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Check your email/password.';
        console.error(err);
      }
    });
  }

  onRegister() {
    console.log('Registering with:', this.name, this.email, this.password, this.role);
  
    this.http.post<any>('https://starstable-api2.azurewebsites.net/api/user', {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
    }).subscribe({
      next: (response) => {
        console.log('Registration success:', response);
  
        if (response?.success || response?.results || response?._id) {
          this.isRegisterMode = false;
          this.errorMessage = '';
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Registration response was not as expected.';
        }
      },
      error: (err) => {
        console.error('Registration failed:', err);
        this.errorMessage = 'Registration failed. Try again.';
      }
    });
  }  

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = '';
  }  
}
