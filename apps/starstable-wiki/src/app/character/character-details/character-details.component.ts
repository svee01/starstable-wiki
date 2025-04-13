import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CharacterService, Character } from '@starstable-wiki/shared/api';

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
    if (this.character && this.character._id) {
      const confirmDelete = confirm(
        `Are you sure you want to delete the character "${this.character.name}"?`
      );
      if (confirmDelete) {
        this.characterService.deleteCharacter(this.character._id).subscribe(() => {
          alert('Character deleted successfully.');
          this.router.navigate(['/characters']);
        });
      }
    }
  }
}