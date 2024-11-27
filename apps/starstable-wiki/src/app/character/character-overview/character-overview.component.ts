import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CharacterService } from 'libs/shared/api/src/lib/services/character.service'; // Adjust import according to your project
import { Character } from 'libs/shared/api/src/lib/models/character.interface'; // Adjust import according to your project

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
    this.characterService.getCharacters().subscribe((data) => {
      this.characters = data;
    });
  }
}
