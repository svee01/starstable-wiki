import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CharacterService } from '@starstable-wiki/shared/api';
import { jwtDecode } from 'jwt-decode';

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

  constructor(private characterService: CharacterService) {
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
      const decoded: any = jwtDecode(token);
      const userId = decoded.sub;

      if (userId) {
        this.characterService.getCharacterByUserId(userId).subscribe({
          next: (character) => {
            this.hasCharacter = !!character;
          },
          error: (err) => {
            console.error('Failed to load character', err);
            this.hasCharacter = false;
          }
        });
      } else {
        this.hasCharacter = false;
      }
    } else {
      this.hasCharacter = false;
    }
  }
}