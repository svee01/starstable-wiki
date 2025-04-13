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
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post<any>('http://localhost:3000/api/auth/login', {
      email: this.email,
      pass: this.password,
    }).subscribe({
      next: (response) => {
        console.log('Login success, token:', response.results.access_token.access_token);
        localStorage.setItem('token', response.results.access_token.access_token);
        this.router.navigate(['/users']);
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Check your email/password.';
        console.error(err);
      }
    });
  }  
}
