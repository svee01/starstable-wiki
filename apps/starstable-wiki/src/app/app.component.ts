import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'starstable-wiki';
  hasCharacter = false;

  constructor(private http: HttpClient) {
    this.checkCharacter();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  checkCharacter() {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get('http://localhost:3000/api/user/character', {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (response: any) => {
          this.hasCharacter = !!response?.results; // als results bestaat -> true
        },
        error: (err) => {
          console.error('Failed to check character', err);
          this.hasCharacter = false;
        }
      });
    }
  }
}
