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
    this.characterService.getCharacters().subscribe((data) => {
      this.characters = data;
    });
  }
}