import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CharacterService } from 'libs/shared/api/src/lib/services/character.service'; // Adjust import
import { Character } from 'libs/shared/api/src/lib/models/character.interface'; // Adjust import

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {
  character!: Character;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private router: Router
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

  onDelete(characterId: string): void {
    if (this.character && this.character.id) {
      const confirmDelete = confirm(
        `Are you sure you want to delete the character "${this.character.name}"?`
      );
      if (confirmDelete) {
        this.characterService.deleteCharacter(this.character.id).subscribe(() => {
          alert('User deleted successfully.');
          this.router.navigate(['/users']);
        });
      }
    }
  }
}
