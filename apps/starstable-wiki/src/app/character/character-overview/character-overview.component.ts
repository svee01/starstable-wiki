import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CharacterService, Character } from '@starstable-wiki/shared/api';

@Component({
  selector: 'app-character-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './character-overview.component.html',
  styleUrls: ['./character-overview.component.css']
})
export class CharacterOverviewComponent implements OnInit {
  characters: Character[] = [];

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const userId = token ? JSON.parse(atob(token.split('.')[1])).sub : null;

    if (userId) {
      this.characterService.getCharacterByUserId(userId).subscribe((data) => {
        console.log('Loaded character:', data);

        this.characters = [data];
      });
    }
  }

  getName(entity: any): string {
    if (entity && typeof entity === 'object' && 'name' in entity) {
      return entity.name;
    }
    return entity?.toString() || '';
  }  
}