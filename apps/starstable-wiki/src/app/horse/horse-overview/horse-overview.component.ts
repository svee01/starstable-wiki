import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HorseService, Horse } from '@starstable-wiki/shared/api';

@Component({
  selector: 'app-horse-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './horse-overview.component.html',
  styleUrls: ['./horse-overview.component.css'],
})
export class HorseOverviewComponent {
  horses: Horse[] = [];

  constructor(private horseService: HorseService) {
    this.horseService.getHorses().subscribe((data) => (this.horses = data));
  }
}
