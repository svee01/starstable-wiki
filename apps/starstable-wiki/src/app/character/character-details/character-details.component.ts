import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from 'libs/shared/api/src/lib/services/character.service'; // Adjust import
import { Character } from 'libs/shared/api/src/lib/models/character.interface'; // Adjust import

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {
  character!: Character;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    const characterId = this.route.snapshot.paramMap.get('id');
    if (characterId) {
      this.characterService.getCharacterById(characterId).subscribe((data) => {
        this.character = data;
      });
    } else {
      console.error('Character ID is missing');
    }
  }
}
