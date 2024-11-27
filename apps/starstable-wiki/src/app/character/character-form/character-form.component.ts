import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from 'libs/shared/api/src/lib/services/character.service'; // Adjust import
import { Character } from 'libs/shared/api/src/lib/models/character.interface'; // Adjust import
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.css']
})
export class CharacterFormComponent implements OnInit {
  character: Character = { id: '', name: '', ridingSkill: 0, userId: '', stableId: '' };

  constructor(
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.characterService.getCharacterById(id).subscribe((data) => {
        this.character = data;
      });
    }
  }

  onSubmit(): void {
    if (this.character.id) {
      this.characterService.updateCharacter(this.character.id, this.character).subscribe(() => {
        this.router.navigate(['/characters']);
      });
    } else {
      this.characterService.createCharacter(this.character).subscribe(() => {
        this.router.navigate(['/characters']);
      });
    }
  }
}
