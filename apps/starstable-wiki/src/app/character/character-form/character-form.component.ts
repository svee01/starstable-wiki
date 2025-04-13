import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService, Character, StableService, Stable } from '@starstable-wiki/shared/api';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

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
      this.character.userId = decoded.userId;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.characterService.getCharacterById(id).subscribe((data) => {
        this.character = data;
      });
    }
  }

  onSubmit(): void {
    if (this.character._id) {
      this.characterService.updateCharacter(this.character._id, this.character).subscribe(() => {
        this.router.navigate(['/characters']);
      });
    } else {
      this.characterService.createCharacter(this.character).subscribe(() => {
        this.router.navigate(['/characters']);
      });
    }
  }
}