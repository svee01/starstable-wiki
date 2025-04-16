import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService, Character, StableService, Stable } from '@starstable-wiki/shared/api';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { CreateCharacterDto } from '@starstable-wiki/shared/api';

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.css']
})
export class CharacterFormComponent implements OnInit {
  character: Character = { _id: '', name: '', ridingSkill: 0, userId: '', stableId: '' };
  stables: Stable[] = [];

  constructor(
    private characterService: CharacterService,
    private stableService: StableService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.stableService.getStables().subscribe((data) => {
      this.stables = data;
    });

    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.character.userId = decoded.sub;
      console.log('User ID from token:', this.character.userId);
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.characterService.getCharacterById(id).subscribe((data) => {
        this.character = data;
      });
    }
  }

  onSubmit(): void {
    const characterDto: CreateCharacterDto = {
      name: this.character.name,
      ridingSkill: this.character.ridingSkill,
      stableId: this.character.stableId,
    };
  
    if (this.character._id) {
      console.log('Updating character:', characterDto);
      this.characterService.updateCharacter(this.character._id, characterDto).subscribe(() => {
        this.router.navigate(['/characters']);
      });
    } else {
      console.log('Creating character:', characterDto);
      this.characterService.createCharacter(characterDto).subscribe(() => {
        this.router.navigate(['/characters']);
      });
    }
  }
}