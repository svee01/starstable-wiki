import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StableService, Stable, CharacterService, Character } from '@starstable-wiki/shared/api';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-stable-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './stable-overview.component.html',
  styleUrls: ['./stable-overview.component.css'],
})
export class StableOverviewComponent {
  stables: Stable[] = [];

  constructor(
    private characterService: CharacterService,
    private stableService: StableService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      const userId = decoded.sub;

      this.characterService.getCharacterByUserId(userId).subscribe((character: Character) => {
        const characterId = character._id;

        this.stableService.getStablesByCharacterId(characterId).subscribe((data) => {
          this.stables = data;
        });
      });
    }
  }
}
