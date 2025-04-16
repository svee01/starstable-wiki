import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HorseService, Horse, CharacterService, Character } from '@starstable-wiki/shared/api';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-horse-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './horse-overview.component.html',
  styleUrls: ['./horse-overview.component.css'],
})
export class HorseOverviewComponent implements OnInit {
  horses: Horse[] = [];

  constructor(
    private horseService: HorseService,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const decoded: any = jwtDecode(token);
      const userId = decoded.sub;

      this.characterService.getCharacterByUserId(userId).subscribe((character: Character) => {
        this.horseService.getHorsesByCharacterId(character._id).subscribe((horses) => {
          this.horses = horses;
        });
      });
    }
  }
}